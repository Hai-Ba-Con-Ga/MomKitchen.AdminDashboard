import { OrderAdmin } from "@/types/@mk/entity/order";
import {
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { Row, createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import { MouseEvent, useCallback, useMemo } from "react";
import NumberFormat from "react-number-format";
import OrderViewInline from "../components/OrderViewInline";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleEditClick: (order: OrderAdmin) => void;
  handleDelete:(id: string ) => void;
};

const useOrderTable = (props: Props) => {
  const { handleEditClick, handleDelete } = props;
  const theme = useTheme();
  const columnHelper = createColumnHelper<OrderAdmin>();
  // const [orderDetail, setOrderDetail] = useState(null);
  const nav = useNavigate();
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
          cell: ({ row }) => {
            return (<Typography variant="subtitle2" sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              }}>
             OD-{row.original?.no ? row.original?.no : row.original?.id}
            </Typography>
            )
          },
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
              textAlign={"right"}
              variant="subtitle1">
              {renderValue()}
            </Typography>
          ),
        }),
        columnHelper.accessor("totalPrice", {
          header: "totalPrice ",
          cell: ({ renderValue }) => (
            <NumberFormat
            style={{
              display: "block",
              width: "100%",
              textAlign: "right"
            }}
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
            style={{
              display: "block",
              width: "100%",
              textAlign: "right"
            }}
              displayType="text"
              prefix="₫"
              defaultValue={renderValue()}
            />
          ),
        }),
        columnHelper.accessor("createdDate", {
          header: "Order Time",
          cell: ({ renderValue }) => {
            const parsedDate = new Date(renderValue());
            const hours = parsedDate.getUTCHours();
            const minutes = parsedDate.getUTCMinutes();

            // Pad single-digit values with leading zeros
            const day = parsedDate.getUTCDate();
            const month = parsedDate.getUTCMonth() + 1; // Months are 0-indexed, so add 1.
            const year = parsedDate.getUTCFullYear();

            // Pad single-digit values with leading zeros
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedYear = year;
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            const formattedDateTime = `${formattedDay}-${formattedMonth}-${formattedYear} ${formattedHours}:${formattedMinutes}`;
            return <Typography variant="subtitle2" sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              }}>{formattedDateTime}</Typography> ;
          },
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
                      nav(`/order/${row.original?.id}`)
                      // row.toggleExpanded();
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
                      handleDelete(row.original?.id);
                      e.stopPropagation();
                    }}>
                    <Delete  color={theme.palette.error.main} />
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
