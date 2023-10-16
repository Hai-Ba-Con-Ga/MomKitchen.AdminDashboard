import { mockDishes } from "@/data/@mk/mock/Dish";
import { mockOrder } from "@/data/@mk/mock/Order";
import {
  Chip,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import Snackbar from "@ui/@extended/Snackbar";
import MainCard from "@ui/MainCard";
import QuickTable from "@ui/common/table/QuickTable";
import { useEffect, useMemo, useState } from "react";
import useOrderData from "../../hook/useOrderData";
import useOrderTable from "../../hook/useOrderTable";
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
  const data = useMemo(
    () =>
      mockOrder().map((order) => {
        order.meal?.tray?.dishies?.push(...mockDishes);
        return order;
      }),
    []
  );
  const {
    setSortState,
    setKeyword,
    setPagination,
    orderData,
    // deleteOrder,
    // updateOrder,
  } = useOrderData();
  const { columnsDef, renderRowSubComponent } = useOrderTable({
    handleEditClick: () => {
      // TODO implement
    },
  });
  useEffect(() => {
    console.log(orderData);
  }, [orderData]);
  const nav = useNavigate();
  const [tabValue, setTabValue] = useState("all");
  return (
    <MainCard content={false}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          margin: "2rem 0 0 2rem",
        }}>
        <Tabs
          value={tabValue}
          onChange={(e, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example">
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography  fontWeight={600}>All</Typography>
                <Chip
                  color="primary"
                  label="1"
                  size="small"
                  variant="light"

                />
              </Stack>
            }
            value={"all"}
          />
          <Tab  label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600} >Unpaid</Typography>
                <Chip
                  color="warning"
                  label="1"
                  size="small"
                  variant="light"

                />
              </Stack>
            } value="unpaid" />
          <Tab label={<Stack direction={"row"} gap={1}>
                <Typography fontWeight={600} >Cancel</Typography>
                <Chip
                  color="error"
                  label="1"
                  size="small"
                  variant="light"

                />
              </Stack>} value="cancel" />
          <Tab  label={<Stack direction={"row"} gap={1}>
                <Typography fontWeight={600} >Complete</Typography>
                <Chip
                  color="success"
                  label="1"
                  size="small"
                  variant="light"
                />
              </Stack>}  value="complete" />
        </Tabs>
      </Box>
      <QuickTable
        columns={columnsDef}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        onPaginationChange={(pagination) => {
          setPagination(pagination);
        }}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: true,
          addButtonHandler: () => {
            // TODO : add action, nav page -> create/update
            nav("/order/create");
          },
          buttonContentLangKey: "Add order",
        }}
        onSearchKeywordChange={(q) => setKeyword(q)}
        onSortByChange={(sort) => setSortState(sort)}
        actionComponents={
          <>
            <DatePicker
              // value={value}
              onChange={(val) => {
                console.log(typeof val);
              }}
            />
            <DatePicker
              // value={value}
              onChange={(val) => {
                console.log(typeof val);
              }}
            />
          </>
        }
      />
      <Snackbar />
    </MainCard>
  );
};

export default OrderListPage;
