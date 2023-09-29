import { mockDishes } from "@/data/@mk/mock/Dish";
import { mockOrder } from "@/data/@mk/mock/Order";
import { OrderAdmin } from "@/types/@mk/entity/order";
import { CloseOutlined, EyeTwoTone } from "@ant-design/icons";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Chip, Dialog, IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { Row, createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import MainCard from "@ui/MainCard";
import QuickTable from "@ui/common/table/QuickTable";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import { useCallback, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import OrderViewInline from "../../components/OrderViewInline";

const OrderListPage = () => {
  const theme = useTheme();

  const data = useMemo(
    () =>
      mockOrder().map((order) => {
        order.meal?.tray?.dishies?.push(...mockDishes);
        return order;
      }),
    []
  );

  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const columnHelper = createColumnHelper<OrderAdmin>();

  const columns = useMemo(
    () => {
      const cols = [
        columnHelper.accessor("selection", {
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
            <IndeterminateCheckbox
              indeterminate={false}
              checked={row.getIsSelected()}
            />
          ),
          enableSorting: false,
        }),
        columnHelper.accessor("id", {
          header: "#",
        }),
        columnHelper.accessor("customer", {
          header: "Customer",
          cell: ({ row }) => {
            const { getValue } = row;
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Avatar 1"
                  size="sm"
                  src={row.original.customer?.user?.avatarUrl}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {row.original.customer?.user?.fullName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.original.customer?.user?.email}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
        }),
        columnHelper.accessor("meal", {
          header: "Tray",
          enableSorting: false,
          cell: ({ row }) => {
            const { getValue } = row;
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Meal"
                  size="sm"
                  src={row.original.meal?.tray?.imgUrl}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {row.original.meal?.tray?.name.toUpperCase()}
                  </Typography>
                  {/* <Typography variant="caption" color="textSecondary">
                    {row.original.customer?.user?.email}
                  </Typography> */}
                </Stack>
              </Stack>
            );
          },
        }),
        columnHelper.accessor("totalQuantity", {
          header: "Total Quantity",
          cell: ({ renderValue }) => (
            <Typography
              fontWeight="500"
              textAlign={"center"}
              variant="subtitle1">
              {renderValue()}
            </Typography>
          ),
        }),
        columnHelper.accessor("totalPrice", {
          header: "totalPrice ",
          cell: ({ renderValue }) => (
            <NumberFormat
              displayType="text"
              prefix="₫"
              defaultValue={renderValue()}
            />
          ),
        }),
        columnHelper.accessor("surcharge", {
          header: "Surcharge",
          cell: ({ renderValue }) => (
            <NumberFormat
              displayType="text"
              prefix="₫"
              defaultValue={renderValue()}
            />
          ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ renderValue }) => {
            // TODO: order status migrate
            switch (renderValue() as any) {
              case 100:
                return (
                  <Chip
                    color="error"
                    label="UNPAID"
                    size="small"
                    variant="filled"
                  />
                );
              case 101:
                return (
                  <Chip
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
                  <Chip
                    color="success"
                    label="COMPLETED"
                    size="small"
                    variant="filled"
                  />
                );
              case 105:
                return (
                  <Chip
                    color="error"
                    label="CANCEL"
                    size="small"
                    variant="filled"
                  />
                );
              default:
                return (
                  <Chip
                    color="primary"
                    label="Single"
                    size="small"
                    variant="filled"
                  />
                );
            }
          },
        }),
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
                    onClick={(e: any) => {
                      e.stopPropagation();
                      row.toggleExpanded();
                    }}>
                    {collapseIcon}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setCustomer(null);
                      handleAdd();
                    }}>
                    <EditTwoTone color={theme.palette.primary.main} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}>
                    <DeleteTwoTone
                      // rev={{}}
                      color={theme.palette.error.main}
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

  const renderRowSubComponent = useCallback(
    (row: Row<OrderAdmin>) => {
      console.log(row);

      return <OrderViewInline data={row.original} />;
    },
    [data]
  );
  const [tabValue, setTabValue] = useState("all");
  return (
    <MainCard content={false}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", margin: "2rem 0 0 2rem" }}>
        <Tabs
          value={tabValue}
          onChange={(e, value) => {
            setTabValue(value);
          }}
          aria-label="basic tabs example">
          <Tab  
          sx={{fontWeight: 600}}
           label={<Stack direction={"row"} gap={1}>
            <Typography>All</Typography>
             <Chip
            color="primary"
            label="UNPAID"
            size="small"
            variant="filled"
          />
           </Stack>} value={"all"}  />
          <Tab 
          sx={{fontWeight: 600}}
          
          label="Cancel" value="cancel" />
          <Tab 
          sx={{fontWeight: 600}}
          label="Complete" value="complete"/>
        </Tabs>
      </Box>
      <QuickTable
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        onPaginationChange={(pagination) => {
          console.log(pagination);
        }}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: true,
          addButtonHandler: () => {
            setAdd(true);
          },
          buttonContentLangKey: "Add order",
        }}
        onSearchKeywordChange={(q) => console.log(q)}
        onSortByChange={(sort) => console.log(sort)}
      />
      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}></Dialog>
    </MainCard>
  );
};

export default OrderListPage;
