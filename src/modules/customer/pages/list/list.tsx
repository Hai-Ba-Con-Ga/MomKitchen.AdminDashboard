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
import { createColumnHelper } from "@tanstack/react-table";
import QuickTable from "@ui/common/table/QuickTable";
import NumberFormat from "react-number-format";
import AddCustomerModal from "../../components/AddCustomerModal";

const avatarImage = (s: string) => "@/assets/images/users" + s;

// ==============================|| REACT TABLE ||============================== //

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = () => {
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
      const cols  = [
        columnHelper.accessor("selection", {
          header : ({table: {getIsAllRowsSelected, getIsSomeRowsSelected, getToggleAllRowsSelectedHandler}})=>(
            <IndeterminateCheckbox
              {...{
                checked: getIsAllRowsSelected(),
                indeterminate: getIsSomeRowsSelected(),
                onChange: getToggleAllRowsSelectedHandler()
              }}
            />
          ),
          cell: ({row})=>(<IndeterminateCheckbox indeterminate={false} checked={row.getIsSelected()} />),
          enableSorting: false
        }),
        columnHelper.accessor("id", {
          header : "#",          
        }),
        columnHelper.accessor("fatherName", {
          header : "Customer Name",
          cell: ({ row }) => {
            const { getValue } = row;
            return (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  alt="Avatar 1"
                  size="sm"
                  src={avatarImage(
                    `./avatar-${!getValue("avatar") ? 1 : getValue("avatar")}.png`
                  )}
                />
                <Stack spacing={0}>
                  <Typography variant="subtitle1">{getValue("fatherName")}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getValue("email")}
                  </Typography>
                </Stack>
              </Stack>
            );
          },          
        }),
        columnHelper.accessor("avatar",{
          header : "Avatar",
          enableSorting:false
        }),
        columnHelper.accessor("email",{
          header : "Email",
        }),
        columnHelper.accessor("contact",{
          header : "Contact",
          cell: ({renderValue})=>(<NumberFormat
            displayType="text"
            format="+1 (###) ###-####"
            mask="_"
            defaultValue={renderValue() as any}
          />)
        }),
        columnHelper.accessor("age",{
          header : "Order",
        }),
        columnHelper.accessor("visits",{
          header : "Spent",
          cell : ({renderValue})=>(<NumberFormat
            value={renderValue() as any}
            displayType="text"
            thousandSeparator
            prefix="$"
          />)
        }),
        columnHelper.accessor("status",{
          header : "Status",
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
        columnHelper.accessor("action",{
          header : "Actions",
          enableSorting:false,
          cell: ({ row }) => {
            const collapseIcon = row.getIsExpanded() ? (
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
        })
      ] ;
      return cols;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  
  const renderRowSubComponent = useCallback(
    (row) => {
    console.log(row);
    
    return <CustomerView data={data[row.id]} />},
    [data]
  );
 
  return (
    <MainCard content={false}>
      {/* <ScrollX>
        <BaseTable
          addButtonContentKey="add_customer"
          columns={columns}
          data={data}
          handleAdd={handleAdd}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
        <ListTableHeader search={{
          keyword : "hi",
          setKeyword : (q)=>{console.log(q);}
        }} 
          additionButton={{
            isShown:true,
            addButtonContentKey: "Add Customer",
            handleAdd: (e)=>{e.preventDefault()}
          }}
        />
        <BaseTableV8 footer={{hasFooter:false}} columns={columns}
          isMultiSelection={true}
          rowSelected={[]}
          paging={{

          }}
          primaryKey="id"
          onSortBy={(...r)=>{
            console.log(r);
            
          }}
          renderRowSubComponent={renderRowSubComponent}
          onRowSelect={(a)=>{
            console.log(a);
            
          }}
          data={data}/>
        <TablePagination gotoPage={goToPage} pageIndex={pagination.pageIndex} pageSize={pagination.pageSize} totalItems={200} setPageSize={changePageSize} />
      </ScrollX> */}
    <QuickTable columns={columns} data={data} 
      renderRowSubComponent={renderRowSubComponent}
      onPaginationChange={(pagination)=> {console.log(pagination);
      }}
      onRowSelectedChange={rows=>console.log(rows)
      }
      addButton={{
        isShown: true,
        addButtonHandler: ()=>{setAdd(true)},
        buttonContentLangKey: "Add customer"
      }}
      onSearchKeywordChange={q => console.log(q)
      }
      onSortByChange={sort =>console.log(sort)
      }
    />
      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}>
        {add && <AddCustomerModal customer={customer} onCancel={handleAdd} />}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
