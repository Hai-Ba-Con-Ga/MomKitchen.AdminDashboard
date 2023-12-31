import { OrderAdmin } from "@/types/@mk/entity/order";
import { FilterOps } from "@/types/common/pagination/FilterState";
import { BlockOutlined, GetApp, Refresh } from "@mui/icons-material";
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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OrderActionMenu from "../../components/Menu/OrderActionMenu";
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
  const [selectionRows, setSelectionRows] = useState<string[]>();
  const {t} = useTranslation();
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
    batchExportFunction
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
  const ActionBars = useMemo(()=> <>
  {selectionRows?.length>0 && 
  <OrderActionMenu listData={orderData??[]} selectionRows={selectionRows} />
  }
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
  <Button
            variant="shadow"
            startIcon={<GetApp />}
            onClick={()=>{
              batchExportFunction();
            }}>
            {t("export_order")}
          </Button>
</>,[selectionRows, orderData])
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
                <Typography fontWeight={600}>{t("all")}</Typography>
                <Chip color="primary" label="1" size="small" variant="light" />
              </Stack>
            }
            value={"all"}
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>{t("unpaid")}</Typography>
                <Chip color="warning" label="1" size="small" variant="light" />
              </Stack>
            }
            value="unpaid"
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>{t("paid")}</Typography>
                <Chip color="primary" label="1" size="small" variant="light" />
              </Stack>
            }
            value="paid"
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>{t("cancel")}</Typography>
                <Chip color="error" label="1" size="small" variant="light" />
              </Stack>
            }
            value="canceled"
          />
          <Tab
            label={
              <Stack direction={"row"} gap={1}>
                <Typography fontWeight={600}>{t("complete")}</Typography>
                <Chip color="success" label="1" size="small" variant="light" />
              </Stack>
            }
            value="completed"
          />
        </Tabs>
      </Box>
      <QuickTable<OrderAdmin>
        totalRows={totalRows}
        columns={columnsDef}
        data={orderData??[]}
        onPaginationChange={(pagination) => {
          setPagination(pagination);
        }}
        onRowSelectedChange={(rows) => setSelectionRows(rows)}
        addButton={{
          isShown: false,
          addButtonHandler: () => {
            nav("/order/create");
          },
          buttonContentLangKey: "Export list orders",
        }}
        onSearchKeywordChange={(q) => setKeyword(q)}
        onSortByChange={(sort) => setSortState(sort)}
        actionComponents={
          ActionBars
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
