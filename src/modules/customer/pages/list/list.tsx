import { useCallback, useMemo, useState } from "react";

// material-ui
import {
  Chip,
  Dialog,
  Stack,
  Tooltip,
  Typography
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
import ScrollX from "@/base/components/ScrollX";
import {
  IndeterminateCheckbox
} from "@/base/components/third-party/ReactTable";
import makeData from "@/data/react-table";

// assets
import {
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import BaseTable from "@/base/components/common/table/BaseTable";

const avatarImage = (s: string) => "@/assets/images/users" + s;

// ==============================|| REACT TABLE ||============================== //

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = () => {
  const theme = useTheme();

  const data = useMemo(() => makeData(200), []);

  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const columns = useMemo(
    () => [
      {
        title: "Row Selection",
        Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
          <IndeterminateCheckbox
            indeterminate
            {...getToggleAllPageRowsSelectedProps()}
          />
        ),
        accessor: "selection",
        Cell: ({ row }: any) => (
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        ),
        disableSortBy: true,
      },
      {
        Header: "#",
        accessor: "id",
        className: "cell-center",
      },
      {
        Header: "Customer Name",
        accessor: "fatherName",
        Cell: ({ row }: any) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                alt="Avatar 1"
                size="sm"
                src={avatarImage(
                  `./avatar-${!values.avatar ? 1 : values.avatar}.png`
                )}
              />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.fatherName}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values.email}
                </Typography>
              </Stack>
            </Stack>
          );
        },
      },
      {
        Header: "Avatar",
        accessor: "avatar",
        disableSortBy: true,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact",
        accessor: "contact",
        // eslint-disable-next-line
        Cell: ({ value }) => (
          <NumberFormat
            displayType="text"
            format="+1 (###) ###-####"
            mask="_"
            defaultValue={value}
          />
        ),
      },
      {
        Header: "Order",
        accessor: "age",
        className: "cell-right",
      },
      {
        Header: "Spent",
        accessor: "visits",
        className: "cell-right",
        Cell: ({ value }: any) => (
          <NumberFormat
            value={value}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: any) => {
          switch (value) {
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
      },
      {
        Header: "Actions",
        className: "cell-center",
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const collapseIcon = row.isExpanded ? (
            <CloseOutlined
              rev={{}}
              style={{ color: theme.palette.error.main }}
            />
          ) : (
            <EyeTwoTone rev={{}} twoToneColor={theme.palette.secondary.main} />
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
                    row.toggleRowExpanded();
                  }}>
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setCustomer(row.values);
                    handleAdd();
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
                  onClick={(e: any) => {
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
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(
    ({ row }: any) => <CustomerView data={data[row.id]} />,
    [data]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <BaseTable
          columns={columns}
          data={data}
          handleAdd={handleAdd}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>

      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}>
        {/* {add && <AddCustomer customer={customer} onCancel={handleAdd} />} */}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
