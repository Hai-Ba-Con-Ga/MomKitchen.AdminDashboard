import { useEffect, useMemo, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import MainCard from '@ui/MainCard';
import AnalyticEcommerce from '@ui/common/chart/AnalyticEcommerce';

import useCustomerData from '@/modules/customer/hook/useCustomerData';
import useKitchenData from '@/modules/kitchen/hook/useKitchenData';
import useOrderData from '@/modules/order/hook/useOrderData';
import IncomeAreaChart from '@ui/common/chart/IncomeAreaChart';
import MonthlyBarChart from '@ui/common/chart/MonthlyBarChart';
import OrderTable from '@ui/common/chart/OrdersTable';
import PieChartArea from '@ui/common/chart/PieChartArea';
import NumberFormat from 'react-number-format';

// avatar style
// const avatarSX = {
//     width: 36,
//     height: 36,
//     fontSize: '1rem'
//   };
  
//   // action style
//   const actionSX = {
//     mt: 0.75,
//     ml: 1,
//     top: 'auto',
//     right: 'auto',
//     alignSelf: 'flex-start',
//     transform: 'none'
//   };
  
//   // sales report status
//   const status = [
//     {
//       value: 'today',
//       label: 'Today'
//     },
//     {
//       value: 'month',
//       label: 'This Month'
//     },
//     {
//       value: 'year',
//       label: 'This Year'
//     }
//   ];
const DashboardPage = () => {
  
    // const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [weekSales, setWeeksales] = useState(0);
    const {totalRows} = useCustomerData();
    const {totalRows:totalKitchenRows} = useKitchenData();
    const { orderTotalRows, orderData : orderDataThisYear, setPagination} = useOrderData();
    const totalSales = useMemo(()=>{
      return orderDataThisYear?.reduce((prev, cur)=> prev+= cur.totalPrice,0)
    },[orderDataThisYear])
    console.log("totalOrderRowsThisYear => ",orderDataThisYear);
    useEffect(()=>{
      setPagination({pageIndex: 0,pageSize: 100 })
    },[])
    return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Kitchens" count={totalKitchenRows.toString()} percentage={100} extra={totalKitchenRows.toString()} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Users" count={totalRows.toString()} percentage={100} extra={totalRows.toString()} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Order" count={orderTotalRows.toString()} percentage={27.4} isLoss color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Sales" count={
                    <NumberFormat value={totalSales} displayType="text" thousandSeparator suffix="đ" />
            
            } percentage={27.4} color="primary" extra="$20,395" />
        </Grid>
  
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
  
        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">New comming Kitchen/Customer</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setSlot('month')}
                  color={slot === 'month' ? 'primary' : 'secondary'}
                  variant={slot === 'month' ? 'outlined' : 'text'}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('week')}
                  color={slot === 'week' ? 'primary' : 'secondary'}
                  variant={slot === 'week' ? 'outlined' : 'text'}
                >
                  Week
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">
                <NumberFormat value={weekSales} displayType="text" thousandSeparator suffix="đ" />
                </Typography>
              </Stack>
            </Box>
            <MonthlyBarChart onWeeksaleChange={(sale )=>setWeeksales(sale)} />
          </MainCard>
        </Grid>
  
        {/* row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrderTable  />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Kitchen By Area</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <PieChartArea/>
          </MainCard>
        </Grid>
  
        {/* row 4 */}
        {/* <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Sales Report</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <SalesColumnChart />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transaction History</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter'
                    }}
                  >
                    <GiftOutlined rev={{}} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $1,430
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      78%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.lighter'
                    }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $302
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      8%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.lighter'
                    }}
                  >
                    <SettingOutlined  rev={{}}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $682
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      16%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Help & Support Chat
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      Typical replay within 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Travis Howard" src={avatar2} />
                    <Avatar alt="Cindy Baker" src={avatar3} />
                    <Avatar alt="Agnes Walker" src={avatar4} />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                Need Help?
              </Button>
            </Stack>
          </MainCard>
        </Grid> */}
      </Grid>
    );
  
}

export default DashboardPage