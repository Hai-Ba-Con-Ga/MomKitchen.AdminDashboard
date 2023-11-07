import { OrderAdmin } from '@/types/@mk/entity/order';
import { GetApp } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { CSVLink } from "react-csv";
type Props = {
    selectionRows:string[];
    listData?: OrderAdmin[];
}

const headerRow = [
  "Order ID",
  "Order No",
  "Total Quantity",
  "Total Price",
  "Surcharge",
  "Customer Id",
  "Customer Name",
  "Customer Email",
  "Customer Phone",
  "Meal Name",
  "Tray Name",
  "Service From",
  "Service To",
  "Kitchen Id",
  "Kitchen Name",
  "Order Date"
];
// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["Ahmed", "Tomi", "ah@smthing.co.com"],
//   ["Raed", "Labes", "rl@smthing.co.com"],
//   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];
const OrderActionMenu = ({selectionRows, listData}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const csvData = React.useMemo(()=>{
      if(listData){
        const filterData = listData?.filter(order => selectionRows.includes(order.id));
        return [headerRow,...filterData.map(order => [order?.id, order?.no,order?.totalQuantity,order?.totalQuantity, order?.surcharge, order?.customerId, order?.customer?.user?.fullName, order?.customer?.user?.email, order?.customer?.user?.phone, order?.meal?.name,order?.meal?.tray?.name, order?.meal?.serviceFrom, order?.meal?.serviceTo, order?.meal?.kitchenId, order?.meal?.kitchen?.name, order?.createdDate   ])]
      }
    },[selectionRows,listData])
    return (
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Actions
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <GetApp />
            
            <CSVLink data={csvData}>Export CSV</CSVLink>
          </MenuItem>
          {/* <MenuItem onClick={handleClose} disableRipple>
            <FileCopyIcon />
            Duplicate
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <MoreHorizIcon />
            More
          </MenuItem> */}
        </StyledMenu>
      </div>
    );
}
const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
export default OrderActionMenu