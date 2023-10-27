import { CustomerAdmin } from "@/types/@mk/entity/customer";
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
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import useUserData from "../../hook/useUserData";
import { CustomerCard } from "../Card/UserCard";
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
  }, [setPagination,setRoleName,refetchData]);
  const handleChangeKeyword = debounce(
    () => refetchData(),
    500
  );
  useEffect(() => {
    handleChangeKeyword();
  }, [keyword, handleChangeKeyword]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
