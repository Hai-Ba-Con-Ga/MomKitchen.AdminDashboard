import makeData from "@/data/react-table";
import CustomerView from "@/modules/customer/components/CustomerView";
import { Order } from "@/types/@mk/entity/order";
import { CloseOutlined, EyeTwoTone } from "@ant-design/icons";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/material";
import { Dialog, IconButton } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { createColumnHelper } from "@tanstack/react-table";
import Avatar from "@ui/@extended/Avatar";
import MainCard from "@ui/MainCard";
import QuickTable from "@ui/common/table/QuickTable";
import { IndeterminateCheckbox } from "@ui/third-party/ReactTable";
import React, { useCallback, useMemo, useState } from "react";
import NumberFormat from "react-number-format";


const OrderListPage = () => {
  const theme = useTheme();

  const data = useMemo(() => makeData(20), []);

  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const columnHelper = createColumnHelper();

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
        columnHelper.accessor("fatherName", {
          header: "Customer Name",
          cell: ({ row }) => {
            const { getValue } = row;
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar alt="Avatar 1" size="sm" src={row} />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">
                    {getValue("fatherName")}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getValue("email")}
                  </Typography>
                </Stack>
              </Stack>
            );
          },
        }),
        columnHelper.accessor("avatar", {
          header: "Avatar",
          enableSorting: false,
        }),
        columnHelper.accessor("email", {
          header: "Email",
        }),
        columnHelper.accessor("contact", {
          header: "Contact",
          cell: ({ renderValue }) => (
            <NumberFormat
              displayType="text"
              format="+1 (###) ###-####"
              mask="_"
              defaultValue={renderValue() as any}
            />
          ),
        }),
        columnHelper.accessor("age", {
          header: "Order",
        }),
        columnHelper.accessor("visits", {
          header: "Spent",
          cell: ({ renderValue }) => (
            <NumberFormat
              value={renderValue() as any}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ renderValue }) => {
            switch (renderValue()) {
              case "Complicated":
                return (
                  <Chip
                    color="error"
                    label="Complicated"
                    size="small"
                    variant="filled"
                  />
                );
              case "Relationship":
                return (
                  <Chip
                    color="success"
                    label="Relationship"
                    size="small"
                    variant="filled"
                  />
                );
              case "Single":
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
        columnHelper.accessor("action", {
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
    (row) => {
      console.log(row);

      return <CustomerView data={data[row.id]} />;
    },
    [data]
  );

  return (
    <MainCard content={false}>
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
