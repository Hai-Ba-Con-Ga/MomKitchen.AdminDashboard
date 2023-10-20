import { Download, Edit, Print, Share } from '@mui/icons-material';
import { Chip, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import MainCard from '@ui/MainCard';
// import { useParams } from 'react-router-dom';

import Logo from "@/assets/images/logo.png";
import { mockDishes } from '@/data/@mk/mock/Dish';
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import Avatar from '@ui/@extended/Avatar';
import OrderDishCard from '../../components/OrderDishCard';

const OrderDetailPage = () => {
    // const {id} = useParams();
    const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    // const {orderDetailData} = useOrderData(false)
    const fontSizeCommon = "1rem"
  return (
   <MainCard >
     <Chip variant='combined' sx={{py: 3, width: "100%", justifyContent:"flex-end"}}  color='primary' label={
        <Stack direction={"row"} gap={1}>
            <IconButton size='small' disableRipple><Edit sx={{fontSize:"1.25rem"}}/></IconButton>
            <IconButton size='small' disableRipple><Download sx={{fontSize:"1.25rem"}}/></IconButton>
            <IconButton size='small' disableRipple><Print sx={{fontSize:"1.25rem"}}/></IconButton>
            <IconButton size='small' disableRipple><Share sx={{fontSize:"1.25rem"}}/></IconButton>
        </Stack>
    }/>
    <Stack direction={"row"} mt={3} alignItems={"center"} justifyContent={"space-between"}>
        <Stack gap={.75}>
            <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
                <Avatar src={Logo}/>
                <Typography variant='h3'>MomKitchen</Typography>
                <Chip variant='light' label="Status"/>
            </Stack>
            <Typography fontWeight={500} pl={6} color={"GrayText"}>#8795646525451</Typography>
        </Stack>
        <Stack>
            <Stack direction="row" gap={1} justifyContent={"flex-end"}>
                <Typography fontWeight={600}>Date</Typography>
                <Typography>01/05/2022</Typography>
            </Stack>
            <Stack direction="row" gap={1} justifyContent={"flex-end"}>
                <Typography fontWeight={600}>Complete Date</Typography>
                <Typography>02/06/2022</Typography>
            </Stack>
        </Stack>
    </Stack>
    <Stack direction={"row"} mt={3} alignItems={"flex-end"} gap={3} >
        <MainCard sx={{flexGrow: 1}}>
            <Stack gap={.5}>
                <Typography variant='subtitle1' fontSize={"1.25rem"} >Customer</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon}  color="GrayText">Ian Carpenter</Typography>
                <Typography variant='subtitle2'fontSize={fontSizeCommon}  color="GrayText">1754 Ureate, RhodSA5 5BO</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon}  color="GrayText">+91 1234567890</Typography>
                <Typography variant='subtitle2'fontSize={fontSizeCommon}  color="GrayText">iacrpt65@gmail.com</Typography>
            </Stack>
        </MainCard>
        <MainCard sx={{flexGrow: 1}}>
        <Stack gap={.5}>
                <Typography variant='subtitle1' fontSize={"1.25rem"}>Kitchen</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon} color="GrayText">Belle J. Richter</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon} color="GrayText">1300 Mine RoadQuemado, NM 87829</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon} color="GrayText">305-829-7809</Typography>
                <Typography variant='subtitle2' fontSize={fontSizeCommon} color="GrayText">belljrc23@gmail.com</Typography>
            </Stack>
        </MainCard>
    </Stack>
    <MainCard sx={{mt: 3}}
    title={ <Typography variant='h4' >Meal Information</Typography>}
    >
 
                <List sx={{ py: 0 }}>
                  <ListItem divider={!matchDownMD}>
                    <Box >
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Meal Name</Typography>
                          <Typography>
                            data.meal?.name
                            </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Kitchen</Typography>
                          <Typography>
                            data.meal?.kitchen?.name
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Serve from</Typography>
                          <Typography>data.meal?.serviceFrom</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Serve from</Typography>
                          <Typography>
                          <Typography>data.meal?.serviceTo</Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Quantity</Typography>
                          <Typography>data.totalQuantity</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Total price</Typography>
                          <Typography>
                          <Typography fontWeight={600}>data.totalPrice</Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Tray</Typography>
                      <Typography>data?.meal?.tray?.name</Typography>
                      <Stack direction={"row"} gap={1}>
                        {/* {
                          data?.meal?.tray?.dishies?.map(dish => <OrderDishCard data={dish}/>)
                        } */}
                         {
                          mockDishes?.map(dish => <OrderDishCard data={dish}/>)
                        }

                      </Stack>
                    </Stack>
                  </ListItem>
                </List>
              {/* </MainCard> */}
              {/* <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m {data.user.fullName} {data.user.role?.name} based
                  in international company, {"Bio"}
                </Typography>
              </MainCard> */}
            {/* </Stack> */}
          {/* </Grid> */}
    </MainCard>
    <Stack alignItems={"flex-end"} mt={3}>
        <Stack width="40%" gap={.75} >
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fontSizeCommon} variant='subtitle2'  color="GrayText">Sub Total:</Typography>
                <Typography fontSize={fontSizeCommon}>$10464.55</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fontSizeCommon} variant='subtitle2' color="GrayText">Discount:</Typography>
                <Typography fontSize={fontSizeCommon}>$52.32</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fontSizeCommon} variant='subtitle2' color="GrayText">Tax:</Typography>
                <Typography fontSize={fontSizeCommon}>$20.93</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fontSizeCommon} variant='subtitle1' >Grand Total:</Typography>
                <Typography fontSize={fontSizeCommon} variant='subtitle1'>$10433.16</Typography>
            </Stack>
        </Stack>
    </Stack>
    <Stack mt={4}>
    <Typography variant='h5'>Note</Typography>
    <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo cupiditate dignissimos dolorem ipsam possimus ratione vitae, iusto qui libero commodi molestias quidem, corporis labore odit magnam necessitatibus repellendus consequatur exercitationem!</Typography>
    </Stack>
    <Stack mt={6} justifyContent="flex-end" direction="row" gap={2}>
        <Button variant='contained'>Download</Button>
        <Button>Go To Payment Information</Button>
    </Stack>
   </MainCard>
  )
}

export default OrderDetailPage