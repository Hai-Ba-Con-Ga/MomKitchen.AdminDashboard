import { useCallback, useMemo, useState } from "react";

// material-ui
import {
  Chip,
  Dialog,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import {
  Column
} from "react-table"
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
import BaseTableV8 from "@/base/components/common/table/BaseTableV8";
import { createColumnHelper } from "@tanstack/react-table";
import ListTableHeader from "@/base/components/common/table/ListTableHeader";
import TablePagination from "@/base/components/common/table/TablePagination";
import QuickTable from "@ui/common/table/QuickTable";

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
        }),
        // {
        //   title: "Row Selection",
        //   Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
        //     <IndeterminateCheckbox
        //       indeterminate
        //       {...getToggleAllPageRowsSelectedProps()}
        //     />
        //   ),
        //   accessor: "selection",
        //   Cell: ({ row }: any) => (
        //     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //   ),
        //   disableSortBy: true,
        // },
        // {
        //   Header: "#",
        //   accessor: "id",
        //   className: "cell-center",
        // },
        // {
        //   Header: "Customer Name",
        //   accessor: "fatherName",
        //   Cell: ({ row }: any) => {
        //     const { values } = row;
        //     return (
        //       <Stack direction="row" spacing={1.5} alignItems="center">
        //         <Avatar
        //           alt="Avatar 1"
        //           size="sm"
        //           src={avatarImage(
        //             `./avatar-${!values.avatar ? 1 : values.avatar}.png`
        //           )}
        //         />
        //         <Stack spacing={0}>
        //           <Typography variant="subtitle1">{values.fatherName}</Typography>
        //           <Typography variant="caption" color="textSecondary">
        //             {values.email}
        //           </Typography>
        //         </Stack>
        //       </Stack>
        //     );
        //   },
        // },
        // {
        //   Header: "Avatar",
        //   accessor: "avatar",
        //   disableSortBy: true,
        // },
        // {
        //   Header: "Email",
        //   accessor: "email",
        // },
        // {
        //   Header: "Contact",
        //   accessor: "contact",
        //   // eslint-disable-next-line
        //   Cell: ({ value }) => (
        //     <NumberFormat
        //       displayType="text"
        //       format="+1 (###) ###-####"
        //       mask="_"
        //       defaultValue={value}
        //     />
        //   ),
        // },
        // {
        //   Header: "Order",
        //   accessor: "age",
        //   className: "cell-right",
        // },
        // {
        //   Header: "Spent",
        //   accessor: "visits",
        //   className: "cell-right",
        //   Cell: ({ value }: any) => (
        //     <NumberFormat
        //       value={value}
        //       displayType="text"
        //       thousandSeparator
        //       prefix="$"
        //     />
        //   ),
        // },
        // {
        //   Header: "Status",
        //   accessor: "status",
        //   Cell: ({ value }: any) => {
        //     switch (value) {
        //       case "Complicated":
        //         return (
        //           <Chip
        //             color="error"
        //             label="Complicated"
        //             size="small"
        //             variant="filled"
        //           />
        //         );
        //       case "Relationship":
        //         return (
        //           <Chip
        //             color="success"
        //             label="Relationship"
        //             size="small"
        //             variant="filled"
        //           />
        //         );
        //       case "Single":
        //       default:
        //         return (
        //           <Chip
        //             color="primary"
        //             label="Single"
        //             size="small"
        //             variant="filled"
        //           />
        //         );
        //     }
        //   },
        // },
        // {
        //   Header: "Actions",
        //   className: "cell-center",
        //   disableSortBy: true,
        //   Cell: ({ row }: any) => {
        //     const collapseIcon = row.isExpanded ? (
        //       <CloseOutlined
        //         rev={{}}
        //         style={{ color: theme.palette.error.main }}
        //       />
        //     ) : (
        //       <EyeTwoTone rev={{}} twoToneColor={theme.palette.secondary.main} />
        //     );
        //     return (
        //       <Stack
        //         direction="row"
        //         alignItems="center"
        //         justifyContent="center"
        //         spacing={0}>
        //         <Tooltip title="View">
        //           <IconButton
        //             color="secondary"
        //             onClick={(e: any) => {
        //               e.stopPropagation();
        //               row.toggleRowExpanded();
        //             }}>
        //             {collapseIcon}
        //           </IconButton>
        //         </Tooltip>
        //         <Tooltip title="Edit">
        //           <IconButton
        //             color="primary"
        //             onClick={(e: any) => {
        //               e.stopPropagation();
        //               setCustomer(row.values);
        //               handleAdd();
        //             }}>
        //             <EditTwoTone
        //               rev={{}}
        //               twoToneColor={theme.palette.primary.main}
        //             />
        //           </IconButton>
        //         </Tooltip>
        //         <Tooltip title="Delete">
        //           <IconButton
        //             color="error"
        //             onClick={(e: any) => {
        //               e.stopPropagation();
        //             }}>
        //             <DeleteTwoTone
        //               rev={{}}
        //               twoToneColor={theme.palette.error.main}
        //             />
        //           </IconButton>
        //         </Tooltip>
        //       </Stack>
        //     );
        //   },
        // },
        
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
  const [pagination,setPagination] = useState<any>({
    pageIndex: 0, 
    pageSize: 25
  })
  const goToPage = (page: number)=> {
    setPagination({...pagination,pageIndex: page})
  }
  const changePageSize = (size: number)=>{
    setPagination({...pagination,pageSize: size})
}
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
        {/* {add && <AddCustomer customer={customer} onCancel={handleAdd} />} */}
      </Dialog>
    </MainCard>
  );
};

export default CustomerList;
