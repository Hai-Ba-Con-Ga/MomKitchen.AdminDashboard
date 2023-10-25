import useKitchenData from "@/modules/kitchen/hook/useKitchenData";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import useUserData from "../../hook/useUserData";
import { KitchenCard } from "../Card/UserCard";
import { toast } from "react-toastify";
type Props = {
  open: boolean;
  onClose: () => void;
  onSelectKitchen: (kitchen: KitchenAdmin) => void;
};

const SearchKitchenModal = (props: Props) => {
  const { open, onClose,onSelectKitchen } = props;
  const {setPagination,setRoleName, refetchData} = useUserData();
  useEffect(()=>{
    setPagination({
      pageIndex:1,
      pageSize: 10
    })
    setRoleName("Admin");
    refetchData();
  },[refetchData,setRoleName,setPagination])
  const [selectCustomer, setSelectCustomer] = useState<any>();

  const {kitchenData, setKeyword,keyword} = useKitchenData()
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
        <DialogTitle>{"Select Kitchen"}</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 , width: "35rem"}}>
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
            {kitchenData?.map((kitchen) => (
              <KitchenCard
              selected = {selectCustomer?.id === kitchen.id}
                data={kitchen }
                onClick={(selectCustomer) => {
                  setSelectCustomer(selectCustomer);
                }}
                key={kitchen.id}
              />
            ))}
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
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
                  onClick={()=>{
                    if(selectCustomer){
                      onSelectKitchen(selectCustomer)
                    }else {
                      toast.error("You must choose one kitchen")
                    }
                  }}
                  type="submit"
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

export default SearchKitchenModal;
