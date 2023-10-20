import React, { useEffect } from "react";
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
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { KitchenCard } from "../Card/UserCard";
import useUserData from "../../hook/useUserData";
type Props = {
  open: boolean;
  onClose: () => void;
  onSelectKitchen: (kitchen: KitchenAdmin) => void;
};

const SearchKitchenModal = (props: Props) => {
  const { open, onClose, onSelectKitchen } = props;
  const {userData,setPagination,setRoleName,setKeyword, refetchData} = useUserData();
  useEffect(()=>{
    setPagination({
      pageIndex:1,
      pageSize: 10
    })
    setRoleName("Admin");
    refetchData();
  },[])
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <Box component={"div"}>
        <DialogTitle>{"Select Kitchen"}</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Stack spacing={1.25}>
            <InputLabel htmlFor="customer-email">Email</InputLabel>
            <TextField
              fullWidth
              id="customer-email"
              placeholder="Customer Email"
            />
          </Stack>
          <Stack>
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
                  type="submit"
                  variant="shadow">
                  {"Select"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SearchKitchenModal;
