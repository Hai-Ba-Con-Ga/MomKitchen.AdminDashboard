import {
  OrderPaymentAdmin
} from "@/types/@mk/entity/orderPayment";
import { PaymentStatus } from "@/types/@mk/enum/paymentStatus";
import {
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { Chip, Tooltip, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import IconButton from "@ui/@extended/IconButton";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import { MouseEvent, useMemo } from "react";
import NumberFormat from "react-number-format";

type Props = {
  handleEditClick?: (orderPayment: OrderPaymentAdmin) => void;
};

const useOrderPaymentTable = (props: Props) => {
  const { handleEditClick } = props;
  const theme = useTheme();
  const columnHelper = createColumnHelper<OrderPaymentAdmin >();
  // const [orderDetail, setOrderDetail] = useState(null);
  const columns = useMemo(
    () => {
      const cols = [
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any,unknown>("selection", {
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
        columnHelper.accessor("order.id", {
          header: "Order Id",
        }),
        columnHelper.accessor("order.customer", {
          header: "Owner",
          cell: ({ row }) => {
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Avatar 1"
                  size="sm"
                  src={row.original.order?.customer?.user?.avatarUrl}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {row.original.order?.customer?.user?.fullName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.original.order?.customer?.user?.email}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
        }),
        columnHelper.accessor("order.meal.kitchen", {
          header: "Owner",
          cell: ({ row }) => {
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Avatar 1"
                  size="sm"
                  src={row.original.order?.meal?.kitchen?.owner?.avatarUrl}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {row.original.order?.meal?.kitchen?.owner?.fullName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.original.order?.meal?.kitchen?.owner?.email}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
        }),
        columnHelper.accessor("paymentType.name", {
          header: "Payment Type",
        }),
        columnHelper.accessor("order.id", {
          header: "Order no",
          cell: ({ renderValue }) => (
            <NumberFormat
              displayType="text"
              prefix="#"
              defaultValue={renderValue()}
            />
          ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ renderValue }) => {
            // TODO: order status migrate
            switch (renderValue()) {
              case PaymentStatus.Cancelled:
                return (
                  <Chip
                    color="error"
                    label="Cancel"
                    size="small"
                    variant="filled"
                  />
                );
              case PaymentStatus.Paid:
                return (
                  <Chip
                    color="success"
                    label="PAID"
                    size="small"
                    variant="filled"
                  />
                );
              case PaymentStatus.Pending:
                return (
                  <Chip
                    color="warning"
                    label="Pending"
                    size="small"
                    variant="filled"
                  />
                );
              default:
                return (
                  <Chip
                    color="warning"
                    label="Pending"
                    size="small"
                    variant="filled"
                  />
                );
            }
          },
        }),
        columnHelper.accessor("createdDate", {
          header: "Status",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any,unknown>("action", {
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

  return {
    columnsDef: columns,
  };
};

export default useOrderPaymentTable;
