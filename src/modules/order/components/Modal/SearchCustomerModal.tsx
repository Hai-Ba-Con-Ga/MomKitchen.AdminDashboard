import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteFilled } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import useUserData from "../../hook/useUserData";
import { debounce } from "lodash";
import { CustomerCard } from "../Card/UserCard";
import { List } from "@mui/material";
type Props = {
  open: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: CustomerAdmin) => void;
};

const SearchCustomerModal = (props: Props) => {
  const { open, onClose, onSelectCustomer } = props;
  const {
    userData,
    setPagination,
    setRoleName,
    setKeyword,
    refetchData,
    keyword,
  } = useUserData();
  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    setRoleName("Admin");
    refetchData();
  }, []);
  const handleChangeKeyword = debounce(
    () => refetchData(),
    500
  );
  useEffect(() => {
    handleChangeKeyword();
  }, [keyword]);
  const [selectCustomer, setSelectCustomer] = useState<any>();
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
        <DialogTitle>{"Select Customer"}</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5, width: "35rem" }}>
          <Stack spacing={1.25}>
            <TextField
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
              id="customer-email"
              placeholder="Search"
            />
          </Stack>
          <Stack mt={2}  gap={2}>
            {userData?.map((user) => (
              <CustomerCard
              selected = {selectCustomer?.id === user.id}
                data={user as CustomerAdmin}
                onClick={(selectCustomer) => {
                  setSelectCustomer(selectCustomer);
                }}
                key={user.id}
              />
            ))}
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  color="error"
                  onClick={() => {
                    onClose();
                  }}>
                  Cancel
                </Button>
                <Button
                  sx={{
                    boxShadow: "none",
                  }}
                  onClick={()=>{onSelectCustomer(selectCustomer)}}
                  type="button"
                  variant="shadow">
                  {"Select"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
    </Dialog>
  );
};

export default SearchCustomerModal;
