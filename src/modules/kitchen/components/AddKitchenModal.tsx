import CustomerManipulateForm from '@/modules/customer/components/form/CustomerManipulateForm';
import { Kitchen, KitchenAdmin } from '@/types/@mk/entity/kitchen';
import { DeleteFilled } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Tooltip } from '@mui/material';
import { Button } from '@mui/material';
import { DialogActions, DialogContent, DialogTitle, Divider, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import IconButton from '@ui/@extended/IconButton';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
    kitchen?: KitchenAdmin
  onCancel: () => void;

}

const AddKitchenModal = (props: Props) => {
    const {kitchen, onCancel} = props
    const isCreating = !kitchen
    const methods = useForm<any>({
        mode: "all",
        resolver: yupResolver(null),
        defaultValues:{
          autoPassword:true
        }
      });
      const deleteHandler = ()=>{
        console.log("TODO : Implement");
      }
  return (
    <>
       <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={methods.handleSubmit( async (data) => {
            console.log("Add customer data => ", data);
          })}>
          <DialogTitle>
            {kitchen ? "Edit kitchen" : "New kitchen"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            {/* <CustomerManipulateForm roles={roles} isCreating={isCreating}/> */}
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete Customer" placement="top">
                    <IconButton
                      onClick={deleteHandler}
                      size="large"
                      color="error">
                      <DeleteFilled rev={{}} />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    color="error"
                    onClick={() => {
                      onCancel();
                    }}>
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      boxShadow: "none",
                    }}
                    type="submit"
                    variant="shadow"
                    // disabled={isSubmitting}
                  >
                    {kitchen ? "Edit" : "Add"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
       </FormProvider>
    </>
  )
}

export default AddKitchenModal