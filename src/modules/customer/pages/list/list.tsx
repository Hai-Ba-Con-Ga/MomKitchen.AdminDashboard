import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

// material-ui
import {
  Button,
  Chip,
  Dialog,
  DialogContentText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
// import NumberFormat from 'react-number-format';

// project import
import CustomerView from "@/modules/customer/components/CustomerView";
// import AddCustomer from 'sections/apps/customer/AddCustomer';
import Avatar from "@/base/components/@extended/Avatar";
import IconButton from "@/base/components/@extended/IconButton";
import MainCard from "@/base/components/MainCard";
import { IndeterminateCheckbox } from "@/base/components/third-party/ReactTable";

// assets
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { CustomerStatus } from "@/types/@mk/enum/customerStatus";
import {
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { BlockOutlined, Refresh } from "@mui/icons-material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import QuickTable from "@ui/common/table/QuickTable";
import NumberFormat from "react-number-format";
import AddCustomerModal from "../../components/AddCustomerModal";
import ViewCustomerDetailModal from "../../components/modal/ViewDetailModal";
import useCustomerData from "../../hook/useCustomerData";

// ==============================|| REACT TABLE ||============================== //

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = () => {
  const theme = useTheme();

  // const data = useMemo(
  //   () =>
  //     // makeData(20)
  //     mockCustomers,
  //   []
  // );
  const {
    customerData: data,
    setPagination,
    refreshCustomerData,
    setSortState,
    deleteCustomer: {mutateAsync : mutateDelete},
    totalRows
  } = useCustomerData();
  useEffect(()=>{
    refreshCustomerData()
  },[refreshCustomerData])
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirmation] = useState<boolean>(false);
  const [detailViewToggle, setDetailViewToggle] = useState<boolean>(false);
  const [actionId, setActionId] = useState<string>();
  // const handleAdd = () => {
  //   setAdd(!add);
  //   if (customer && !add) setCustomer(null);
  // };
  const columnHelper = createColumnHelper<CustomerAdmin>();

  const columns = useMemo<ColumnDef<CustomerAdmin>[]>(
    () => {
      const cols: ColumnDef<CustomerAdmin>[] = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any, any>("selection", {
          header: ({
            table: {
              getIsAllRowsSelected,
              getIsSomeRowsSelected,
              getToggleAllRowsSelectedHandler,
            },
          }) => (
            <IndeterminateCheckbox
              {...{
                checked: getIsAllRowsSelected(),
                indeterminate: getIsSomeRowsSelected(),
                onChange: getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <Box display={"flex"} justifyContent="center">
            <IndeterminateCheckbox
              indeterminate={false}
              checked={row.getIsSelected()}
              />
              </Box>
          ),
          enableSorting: false,
        }),
        columnHelper.accessor("id", {
          header: () => {
            return "#";
          },
          cell: ({ row }) => (
            <Typography  sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              }} textAlign={"center"}>
              CUS-{row?.original?.no}
            </Typography>
          ),
        }),
        columnHelper.accessor("user.fullName", {
          header: "Customer",
          cell: ({ row }) => {
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Avatar 1"
                  size="sm"
                  src={row.original?.avatarUrl}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {row.original?.fullName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.original?.email}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
          meta: {
            align : "left"
          }
        }),
        // columnHelper.accessor("user.avatarUrl", {
        //   header: "Avatar",
        //   enableSorting: false,
        //   enableHiding: true,
        // }),
        columnHelper.accessor("email", {
          header: "Email",
          meta: {
            align : "left"
          }
        }),
        columnHelper.accessor("phone", {
          header: "Contact",
          cell: ({ renderValue }) => (
            <NumberFormat
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              displayType="text"
              format="+1 (###) ###-####"
              mask="_"
              defaultValue={renderValue()}
            />
          ),
          meta: {
            align : "left"
          }
        }),
        columnHelper.accessor("orderQuantity", {
          header: "Order",
          cell: ({ renderValue }) => (
            <Typography textAlign={"right"}>{renderValue() ?? 0}</Typography>
          ),
          meta: {
            align : "right"
          }
        }),
        columnHelper.accessor("spentMoney", {
          header: "Spent",
          cell: ({ renderValue }) => (
            <NumberFormat
              style={{ textAlign: "right", width: "100%", display: "block" }}
              value={renderValue() ?? 0}
              displayType="text"
              thousandSeparator
              suffix="đ"
            />
          ),
          meta: {
            align : "right"
          }
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ row }) => {
            return (
              <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                {row.original.status == CustomerStatus.INACTIVE ? (
                  <Chip
                    color="error"
                    label="Inactive"
                    size="small"
                    variant="filled"
                  />
                ) : (
                  <Chip
                    color="success"
                    label="Active"
                    size="small"
                    variant="filled"
                  />
                )}
              </Box >
            );
          },
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any, any>("action", {
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const collapseIcon = row.getIsExpanded() ? (
              <CloseOutlined
                rev={{}}
                style={{ color: theme.palette.error.main }}
              />
            ) : (
              <EyeTwoTone
                rev={{}}
                twoToneColor={theme.palette.secondary.main}
              />
            );
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={0}>
                <Tooltip title="View">
                  <IconButton
                    color="secondary"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      // row.toggleExpanded();
                      setCustomer(row.original);
                      setDetailViewToggle(true);
                    }}>
                    {collapseIcon}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setCustomer(row.original);
                      setAdd(true)
                    }}>
                    <EditTwoTone
                      rev={{}}
                      twoToneColor={theme.palette.primary.main}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e: MouseEvent) => {
                      setActionId(row.original?.id)
                      setDeleteConfirmation(true);
                      e.stopPropagation();
                    }}>
                    <DeleteTwoTone
                      rev={{}}
                      twoToneColor={theme.palette.error.main}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        }),
      ];
      return cols;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback((row) => {
    console.log(row);

    return <CustomerView data={row.original} />;
  }, []);

  return (
    <MainCard content={false}>
      <QuickTable
        columnVisibility={{
          "user.avatarUrl": true,
        }}
        columns={columns}
        data={data?.data??[]}
        renderRowSubComponent={renderRowSubComponent}
        totalRows={totalRows}
        onPaginationChange={(pagination) => {
          setPagination(pagination)
          console.log(pagination);
        }}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: true,
          addButtonHandler: () => {
            setAdd(true);
          },
          buttonContentLangKey: "Add customer",
        }}
        actionComponents={
          <>
           <IconButton
              aria-label="close"
              onClick={() => refreshCustomerData()}
              color={"secondary"}
              sx={{}}>
              <Refresh />
            </IconButton>
          </>
        }
        onSearchKeywordChange={(q) => console.log(q)}
        onSortByChange={(sort) => setSortState(sort)}
        filter={{
          isShow: true,
          isExpandFilterMenu: true,
          setIsExpandFilterMenu: (val) => {
            console.log(val);
          },
        }}
      />
      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={()=>{setDetailViewToggle(false); setAdd(false); setCustomer(null)}}
        open={add || detailViewToggle}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}>
        {add && <AddCustomerModal customer={customer} onManipulateCallback={()=>{
          setAdd(false); setCustomer(null);refreshCustomerData();
        }} onCancel={()=>{
          setAdd(false); setCustomer(null);
        }} />}
        {detailViewToggle && (
          <ViewCustomerDetailModal
          updateCallback={()=> {
            refreshCustomerData();
            setDetailViewToggle(false)
            setCustomer(null);
          }}
            customer={customer}
            onCancel={() => {
              setCustomer(null);
              setDetailViewToggle(false)}}
          />
        )}
      </Dialog>

      {deleteConfirm && (
        <Dialog
          open={deleteConfirm}
          onClose={() => setDeleteConfirmation(false)}
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
                onClick={() => setDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={async () => {
                  await mutateDelete(actionId);
                  setDeleteConfirmation(false)}}>
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </MainCard>
  );
};

export default CustomerList;
