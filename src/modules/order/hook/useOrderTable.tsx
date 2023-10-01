import { OrderAdmin } from "@/types/@mk/entity/order";
import {
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { Row, createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import { MouseEvent, useCallback, useMemo } from "react";
import NumberFormat from "react-number-format";
import OrderViewInline from "../components/OrderViewInline";

type Props = {
  handleEditClick: (order: OrderAdmin) => void;
};

const useOrderTable = (props: Props) => {
  const { handleEditClick } = props;
  const theme = useTheme();
  const columnHelper = createColumnHelper<OrderAdmin>();
  // const [orderDetail, setOrderDetail] = useState(null);
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
            switch (renderValue()) {
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
                      row.toggleExpanded();
                    }}>
                    {collapseIcon}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      handleEditClick(row.original);
                    }}>
                    <EditTwoTone rev={{}} color={theme.palette.primary.main} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                    }}>
                    <DeleteTwoTone rev={{}} color={theme.palette.error.main} />
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

  const renderRowSubComponent = useCallback((row: Row<OrderAdmin>) => {
    return <OrderViewInline data={row.original} />;
  }, []);
  return {
    columnsDef: columns,
    renderRowSubComponent,
  };
};

export default useOrderTable;
