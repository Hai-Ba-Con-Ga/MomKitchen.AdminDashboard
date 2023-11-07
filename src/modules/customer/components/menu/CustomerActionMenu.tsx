import axiosClient from '@/base/service/axiosClient';
import { CustomerAdmin } from '@/types/@mk/entity/customer';

import { Email, GetApp } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { HanEditor } from '@ui/common/editor';
import * as React from 'react';
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
type Props = {
    selectionRows:string[];
    listData?: CustomerAdmin[];
}
const headerRow = [
    "Customer ID",
    "Customer No",
    "Customer Name",
    "Customer Email",
    "Customer Phone",
    "Customer Avatar",
    "Spent Money",
    "Status"
  ];
const CustomerActionMenu = ({selectionRows, listData}: Props) => {
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
        const filterData = listData?.filter(kitchen => selectionRows.includes(kitchen.id));
        return [headerRow,...filterData.map(customer => [customer?.id, customer?.no, customer?.fullName, customer?.email, customer?.phone, customer?.avatarUrl, customer?.spentMoney, customer?.status])]
      }
    },[selectionRows,listData])

    const [openSendmail,setOpenSendmail] = React.useState(false);
    const [subject,setSubject] = React.useState<string>("");
    const [content,setContent] = React.useState<string>("");
    const emails = React.useMemo(()=>{
        if(listData){
          const filterData = listData?.filter(customer => selectionRows.includes(customer.id));
          return [...filterData.map(customer => customer?.email)]
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
          <MenuItem onClick={()=>{handleClose();setOpenSendmail(true)}} disableRipple>
            <Email />
            Send Email
          </MenuItem>
           {/*<Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <MoreHorizIcon />
            More
          </MenuItem> */}
        </StyledMenu>
        { <Dialog
          open={openSendmail}
          onClose={() => setOpenSendmail(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <Box
            sx={{ p: 1, py: 1.5, justifyContent: "center" }}
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}>
            <DialogTitle id="alert-dialog-title">
              <DialogContentText
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
                id="alert-dialog-description">
                Sending mail to all customers
              </DialogContentText>
            </DialogTitle>
            <DialogContent>
            <Stack spacing={1.25}>
            <TextField
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              id="customer-email"
              placeholder="Subject"
            />
          </Stack>
          <Stack mt={2}  gap={2}>
            <HanEditor readonly={false} value={content} onChange={(v)=>setContent(v)}/>
          </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setOpenSendmail(false)}>
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                    //TODO send mail
                    await axiosClient.post("https://notification.wyvernpserver.tech/mail/send/batch",{
                        tos: emails,
                        subject,
                        content
                    })
                    toast.success("Your email has been sent to customers")
                  setOpenSendmail(false)}}>
                Send
              </Button>
            </DialogActions>
          </Box>
        </Dialog>}
      </div>
    
  )
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
  
export default CustomerActionMenu