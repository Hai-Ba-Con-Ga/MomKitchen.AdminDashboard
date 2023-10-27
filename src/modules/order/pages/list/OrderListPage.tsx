import { OrderAdmin } from "@/types/@mk/entity/order";
import { FilterOps } from "@/types/common/pagination/FilterState";
import { BlockOutlined, Refresh } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import Snackbar from "@ui/@extended/Snackbar";
import MainCard from "@ui/MainCard";
import QuickTable from "@ui/common/table/QuickTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderData from "../../hook/useOrderData";
import useOrderTable from "../../hook/useOrderTable";

const OrderListPage = () => {
  // const data = useMemo(
  //   () =>
  //     mockOrder().map((order) => {
  //       order.meal?.tray?.dishies?.push(...mockDishes);
  //       return order;
  //     }),
  //   []
  // );
  const [confirmationToggle, setConfirmationToggle] = useState(false);
  const [actionId, setActionId] = useState<string>();
  const {
    setSortState,
    setFilter,
    setKeyword,
    setPagination,
    orderData,
    refreshOrderData,
    deleteOrder: { mutateAsync: deleteOrderFunc },
    // updateOrder,
    totalRows,
  } = useOrderData();
  const { columnsDef } = useOrderTable({
    handleEditClick: () => {
      // TODO implement
    },
    handleDelete: async (id) => {
      setActionId(id);
      setConfirmationToggle(true);
    },
  });

  useEffect(() => {
    console.log("render");
  }, [orderData]);

  const nav = useNavigate();
  const [tabValue, setTabValue] = useState("all");
  const [rangeDate, setRangeDate] = useState<{
    from: string;
    to: string;
  }>({
    from: null,
    to: null,
  });
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      tab: {
        field: "tab",
        op: FilterOps.EQUAL,
        value: tabValue,
      },
    }));
  }, [tabValue, setFilter]);
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      from: {
        field: "from",
        op: FilterOps.EQUAL,
        value: rangeDate.from,
      },
    }));
  }, [rangeDate.from, setFilter]);
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      to: {
        field: "to",
        op: FilterOps.EQUAL,
        value: rangeDate.to,
      },
    }));
  }, [rangeDate.to, setFilter]);
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
                <Typography fontWeight={600}>All</Typography>
                <Chip color="primary" label="1" size="small" variant="light" />
              </Stack>
            }
            value={"all"}
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>Unpaid</Typography>
                <Chip color="warning" label="1" size="small" variant="light" />
              </Stack>
            }
            value="unpaid"
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>Cancel</Typography>
                <Chip color="error" label="1" size="small" variant="light" />
              </Stack>
            }
            value="cancel"
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>Complete</Typography>
                <Chip color="success" label="1" size="small" variant="light" />
              </Stack>
            }
            value="complete"
          />
        </Tabs>
      </Box>
      <QuickTable<OrderAdmin>
        totalRows={totalRows}
        columns={columnsDef}
        data={orderData}
        onPaginationChange={(pagination) => {
          setPagination(pagination);
        }}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: false,
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
            <IconButton
              aria-label="close"
              onClick={() => refreshOrderData()}
              color={"secondary"}
              sx={{}}>
              <Refresh />
            </IconButton>
            <DatePicker
              value={rangeDate.from}
              onChange={(val) => {
                setRangeDate({ ...rangeDate, from: val.toString() });
              }}
            />
            <DatePicker
              value={rangeDate.to}
              onChange={(val) => {
                setRangeDate({ ...rangeDate, to: val.toString() });
              }}
            />
          </>
        }
      />
      <Snackbar />
      {confirmationToggle && (
        <Dialog
          open={confirmationToggle}
          onClose={() => setConfirmationToggle(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <Box
            sx={{ p: 1, py: 1.5, justifyContent: "center" }}
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}>
            <DialogTitle id="alert-dialog-title">
              <Box
                sx={{
                  placeItems: "center",
                }}
                display="grid">
                <BlockOutlined color="error" sx={{ fontSize: "4rem" }} />
              </Box>
              <DialogContentText
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
                id="alert-dialog-description">
                Are you sure you want to delete?
              </DialogContentText>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By deleting action, that user will not be able to use
                application no more.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setConfirmationToggle(false)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={async () => {
                  await deleteOrderFunc(actionId);
                  setConfirmationToggle(false);
                }}>
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </MainCard>
  );
};

export default OrderListPage;
