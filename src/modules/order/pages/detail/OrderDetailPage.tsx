import { Download, Print, Share } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MainCard from "@ui/MainCard";
import moment from "moment";
import { usePDF } from "react-to-pdf";
// import { useParams } from 'react-router-dom';

import Logo from "@/assets/images/logo.png";
import { mockDishes } from "@/data/@mk/mock/Dish";
import { OrderStatus } from "@/types/@mk/enum/orderStatus";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import Avatar from "@ui/@extended/Avatar";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import OrderDishCard from "../../components/OrderDishCard";
import useOrderData from "../../hook/useOrderData";

const OrderDetailPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  // const componentRef = useRef<any>();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
  });
  const { orderDetailData, setId } = useOrderData();
  const fontSizeCommon = "1rem";
  const StatusBadge = useMemo(() => {
    if (orderDetailData && orderDetailData?.status) {
      switch (orderDetailData?.status) {
        case OrderStatus.UNPAID:
          return (
            <Chip color="error" label="UNPAID" size="small" variant="filled" />
          );
        case OrderStatus.PAID:
          return (
            <Chip color="warning" label="PAID" size="small" variant="filled" />
          );

        case OrderStatus.COMPLETE:
          return (
            <Chip
              color="success"
              label="COMPLETED"
              size="small"
              variant="filled"
            />
          );
        case OrderStatus.CANCEL:
          return (
            <Chip color="error" label="CANCEL" size="small" variant="filled" />
          );
        case OrderStatus.PENDING:
          return (
            <Chip
              color="warning"
              label="CANCEL"
              size="small"
              variant="filled"
            />
          );
        default:
          return (
            <Chip
              color="warning"
              label="CANCEL"
              size="small"
              variant="filled"
            />
          );
      }
    }
  }, [orderDetailData]);
  useEffect(() => {
    console.log(id);

    if (id) setId(id);
  }, [id, setId]);
  return (
    <MainCard ref={targetRef}>
      <Chip
        variant="combined"
        sx={{
          py: 3,
          width: "100%",
          justifyContent: "flex-end",
          "@media print": {
            display: "none",
          },
        }}
        className="hide"
        id="hide"
        color="primary"
        label={
          <Stack direction={"row"} gap={1}>
            {/* <IconButton size="small" disableRipple>
              <Edit sx={{ fontSize: "1.25rem" }} />
            </IconButton> */}
            <IconButton size="small" disableRipple onClick={() => toPDF()}>
              <Download sx={{ fontSize: "1.25rem" }} />
            </IconButton>
            <IconButton size="small" disableRipple onClick={handlePrint}>
              <Print sx={{ fontSize: "1.25rem" }} />
            </IconButton>
            <IconButton size="small" disableRipple>
              <Share sx={{ fontSize: "1.25rem" }} />
            </IconButton>
          </Stack>
        }
      />
      <Stack
        direction={"row"}
        mt={3}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Stack gap={0.75}>
          <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
            <Avatar src={Logo} />
            <Typography variant="h3">MomKitchen</Typography>
            {StatusBadge}
          </Stack>
          <Typography fontWeight={500} pl={6} color={"GrayText"}>
            #OD-{orderDetailData?.no}
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row" gap={1} justifyContent={"flex-end"}>
            <Typography fontWeight={600}>Date</Typography>
            <Typography>
              {moment(orderDetailData?.createdDate).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} justifyContent={"flex-end"}>
            <Typography fontWeight={600}>Complete Date</Typography>
            <Typography>02/06/2022</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} mt={3} alignItems={"flex-end"} gap={3}>
        <MainCard sx={{ flexGrow: 1 }}>
          <Stack gap={0.5}>
            <Typography variant="subtitle1" fontSize={"1.25rem"}>
              Customer
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              {orderDetailData?.customer?.user?.fullName}
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              {orderDetailData?.customer?.user?.phone}
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              {orderDetailData?.customer?.user?.email}
            </Typography>
            {/* <Typography variant='subtitle2'fontSize={fontSizeCommon}  color="GrayText">iacrpt65@gmail.com</Typography> */}
          </Stack>
        </MainCard>
        <MainCard sx={{ flexGrow: 1 }}>
          <Stack gap={0.5}>
            <Typography variant="subtitle1" fontSize={"1.25rem"}>
              Kitchen
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              Belle J. Richter
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              1300 Mine RoadQuemado, NM 87829
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              305-829-7809
            </Typography>
          </Stack>
        </MainCard>
      </Stack>
      <MainCard
        sx={{ mt: 3 }}
        title={<Typography variant="h4">Meal Information</Typography>}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Box></Box>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Meal Name</Typography>
                  <Typography>{orderDetailData?.meal?.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Kitchen</Typography>
                  <Typography>
                    {orderDetailData?.meal?.kitchen?.name}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Serve from</Typography>
                  <Typography>
                    {moment(orderDetailData?.meal?.serviceFrom).format(
                      "DD/MM/yyyy HH:mm"
                    )}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Serve from</Typography>
                  <Typography>
                    <Typography>
                      {moment(orderDetailData?.meal?.serviceTo).format(
                        "DD/MM/yyyy HH:mm"
                      )}
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Quantity</Typography>
                  <Typography>{orderDetailData?.totalQuantity}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Meal Price</Typography>
                  <Typography>{orderDetailData?.meal?.price}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Stack spacing={0.5}>
              <Typography color="secondary">Tray</Typography>
              <Typography>{orderDetailData?.meal?.tray?.name}</Typography>
              <Stack direction={"row"} gap={1}>
                {/* {
                          data?.meal?.tray?.dishies?.map(dish => <OrderDishCard data={dish}/>)
                        } */}
                {mockDishes?.map((dish) => (
                  <OrderDishCard data={dish} />
                ))}
              </Stack>
            </Stack>
          </ListItem>
        </List>
      </MainCard>
      <Stack alignItems={"flex-end"} mt={3}>
        <Stack width="40%" gap={0.75}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Sub Total:
            </Typography>
            <Typography fontSize={fontSizeCommon}>
              {orderDetailData?.totalPrice}₫
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Tax:
            </Typography>
            <Typography fontSize={fontSizeCommon}>
              {orderDetailData?.totalPrice * 0.1}₫
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              Grand Total:
            </Typography>
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              {Math.round(orderDetailData?.totalPrice * 1.1)}₫
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        mt={4}
        sx={{
          "@media print": {
            display: "none",
          },
        }}>
        <Typography variant="h5">Note</Typography>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
          cupiditate dignissimos dolorem ipsam possimus ratione vitae, iusto qui
          libero commodi molestias quidem, corporis labore odit magnam
          necessitatibus repellendus consequatur exercitationem!
        </Typography>
      </Stack>
      <Stack
        sx={{
          "@media print": {
            display: "none",
          },
        }}
        mt={6}
        justifyContent="flex-end"
        direction="row"
        gap={2}>
        <Button variant="contained" onClick={handlePrint}>
          Download
        </Button>
        <Button>Go To Payment Information</Button>
      </Stack>
    </MainCard>
  );
};

export default OrderDetailPage;
