import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField
} from "@mui/material";
import { useEffect } from "react";
import useUserData from "../../hook/useUserData";
type Props = {
  open: boolean;
  onClose: () => void;
  onSelectKitchen: (kitchen: KitchenAdmin) => void;
};

const SearchKitchenModal = (props: Props) => {
  const { open, onClose } = props;
  const {setPagination,setRoleName, refetchData} = useUserData();
  useEffect(()=>{
    setPagination({
      pageIndex:1,
      pageSize: 10
    })
    setRoleName("Admin");
    refetchData();
  },[refetchData,setRoleName,setPagination])
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
