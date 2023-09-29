// material-ui
import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  Grid,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
// import * as NumberFormat from 'react-number-format';

// project import
import Avatar from "@/base/components/@extended/Avatar";
import MainCard from "@/base/components/MainCard";

// assets
import {
  EnvironmentOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { calculateAge } from "@/base/utils/common";
import { OrderAdmin } from "@/types/@mk/entity/order";
import { useMemo } from "react";
import { Box, styled } from "@mui/system";
import OrderDishCard from "./OrderDishCard";

// ==============================|| CUSTOMER - VIEW ||============================== //
const CustomChip = styled(Chip)`
                  position: "absolute";
                  right: 10;
                  top: 10;
                  fontSize: "0.675rem";
`
const OrderViewInline = ({ data }: { data: OrderAdmin }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const statusComponent = useMemo(()=>{
    switch (data.status) {
      case 100:
        return (
          <CustomChip
            color="error"
            label="UNPAID"
            size="small"
            variant="filled"
          />
        );
      case 101:
        return (
          <CustomChip
            color="warning"
            label="PAID"
            size="small"
            variant="filled"
          />
        );
      case 102:
      case 103:
      case 104:
        return (
          <CustomChip
            color="success"
            label="COMPLETED"
            size="small"
            variant="filled"
          />
        );
      case 105: 
      return (
        <CustomChip
          color="error"
          label="CANCEL"
          size="small"
          variant="filled"
        />
      );
      default:
        return (
          <CustomChip
            color="primary"
            label="Single"
            size="small"
            variant="filled"
          />
        );
    }
  },[data])
  return (
    <TableRow sx={{ "&:hover": { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid
          container
          spacing={2.5}
          sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <MainCard>
              {statusComponent}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar
                      alt="Avatar 1"
                      size="xl"
                      src={data.customer?.user?.avatarUrl}
                    />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{data.customer?.user?.fullName}</Typography>
                      <Typography color="secondary">
                        {data.customer?.user?.role?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">
                        {calculateAge(data.customer?.user?.birthday)}
                      </Typography>
                      <Typography color="secondary">Age</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{0}%</Typography>
                      <Typography color="secondary">Progress</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{0}</Typography>
                      <Typography color="secondary">Visits</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    sx={{ py: 0 }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{data.customer?.user?.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          <NumberFormat
                            displayType="text"
                            format="+1 (###) ###-####"
                            mask="_"
                            defaultValue={data.customer?.user?.phone}
                          />
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EnvironmentOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{"Vietnam"}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LinkOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Link
                          align="right"
                          href="https://google.com"
                          target="_blank">
                          https://anshan.dh.url
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2.5}>
              <MainCard title="Meal">
                <List sx={{ py: 0 }}>
                  <ListItem divider={!matchDownMD}>
                    <Box >
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Meal Name</Typography>
                          <Typography>{data.meal?.name}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Kitchen</Typography>
                          <Typography>
                            {data.meal?.kitchen?.name}
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
                          <Typography>{data.meal?.serviceFrom}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Serve from</Typography>
                          <Typography>
                          <Typography>{data.meal?.serviceTo}</Typography>
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
                          <Typography>{data.totalQuantity}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Total price</Typography>
                          <Typography>
                          <Typography fontWeight={600}>{data.totalPrice}</Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Tray</Typography>
                      <Typography>{data?.meal?.tray?.name}</Typography>
                      <Stack direction={"row"} gap={1}>
                        {
                          data?.meal?.tray?.dishies?.map(dish => <OrderDishCard data={dish}/>)
                        }
                      </Stack>
                    </Stack>
                  </ListItem>
                </List>
              </MainCard>
              {/* <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m {data.user.fullName} {data.user.role?.name} based
                  in international company, {"Bio"}
                </Typography>
              </MainCard> */}
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default OrderViewInline;
