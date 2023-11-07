import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import useOrderData from '@/modules/order/hook/useOrderData';
import { OrderStatus } from '@/types/@mk/enum/orderStatus';
import { ColorProps } from '@/types/extended';
import Dot from '@ui/@extended/Dot';
import NumberFormat from 'react-number-format';


// project import
// import Dot from 'components/@extended/Dot';

// assets
// import { ColorProps } from 'types/extended';

// types
interface Data {
  name: string;
  carbs: number;
  kitchen: string;
  tracking_no: number;
  protein: number;
}


// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

type Order = 'asc' | 'desc';

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Tracking No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Customer Name'
  },
  {
    id: 'kitchen',
    align: 'left',
    disablePadding: false,
    label: 'Kitchen Name'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

interface OrderTableHeadProps {
  order: Order;
  orderBy: string;
}

function OrderTableHead({ order, orderBy }: OrderTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE - STATUS ||============================== //

interface Props {
  status: OrderStatus;
}

const OrderStatusRender = ({ status }: Props) => {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case "UNPAID":
      color = 'warning';
      title = 'Pending';
      break;
    case "PAID":
      color = 'success';
      title = 'Paid';
      break;
    case "CANCELED":
      color = 'error';
      title = 'Rejected';
      break;
    case "COMPLETED":
      color = 'primary';
      title = 'Complete';
      break;
    default :
      color = 'warning';
      title = 'PENDING';
  }
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState<Order>('asc');
  const [orderBy] = useState<keyof Data>('tracking_no');
  const {setPagination, setSortState, orderData} = useOrderData();
  useEffect(()=>{
    setPagination({
      pageIndex:0,
      pageSize: 10
    });
    setSortState([{
      id: "CreatedDate",
      desc: true
    }]);
  },[])
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {orderData?.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row?.id}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to={`/orders/${row?.id}`}>
                      OD-{row?.no}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row?.customer?.user?.fullName}</TableCell>
                  <TableCell align="left">{row?.meal?.kitchen?.name}</TableCell>
                  <TableCell align="left">
                   <OrderStatusRender status={row?.status}/>
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.totalPrice} displayType="text" thousandSeparator suffix="đ" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
