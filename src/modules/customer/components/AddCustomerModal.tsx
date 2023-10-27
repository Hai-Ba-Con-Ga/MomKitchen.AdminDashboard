import { mockRole } from "@/data/@mk/mock/Role";
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { DeleteFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCustomerForm, {
  ManipulateCustomerForm,
} from "../hook/useCustomerForm";
import CustomerManipulateForm from "./form/CustomerManipulateForm";

interface AddCustomerModalProps {
  isOpen?: boolean;
  // onCancel: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
  onCancel: () => void;
  customer: CustomerAdmin;
  onManipulateCallback?: ()=>void
}

const AddCustomerModal = ({
  customer,
  onCancel,
  onManipulateCallback
}: // isOpen,
AddCustomerModalProps) => {
  const isCreating = !customer;
  const defaultValue: ManipulateCustomerForm = !isCreating
    ? {
        autoPassword: true,
        birthday: dayjs(customer?.birthday),
        email: customer?.email,
        phone: customer?.phone,
        fullname: customer?.fullName,
        status: customer?.status,
        // role: customer?.roleId,
      }
    : { autoPassword: true };
  console.log(customer);

  const { CustomerSchema, createCustomerHandler, updateCustomerHandler } = useCustomerForm();
  const deleteHandler = () => {
    // dispatch(deleteCustomer(customer?.id)); - delete
    // dispatch(
    //   openSnackbar({
    //     open: true,
    //     message: 'Customer deleted successfully.',
    //     variant: 'alert',
    //     alert: {
    //       color: 'success'
    //     },
    //     close: false
    //   })
    // );
    onCancel();
  };

  // const formik = useForm({
  //   initialValues: getInitialValues(customer!),
  //   validationSchema: CustomerSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     try {
  //       // const newCustomer = {
  //       //   name: values.name,
  //       //   email: values.email,
  //       //   location: values.location,
  //       //   orderStatus: values.orderStatus
  //       // };

  //       if (customer) {
  //         // dispatch(updateCustomer(customer.id, newCustomer)); - update
  //         dispatch(
  //           openSnackbar({
  //             open: true,
  //             message: 'Customer update successfully.',
  //             variant: 'alert',
  //             alert: {
  //               color: 'success'
  //             },
  //             close: false
  //           })
  //         );
  //       } else {
  //         // dispatch(createCustomer(newCustomer)); - add
  //         dispatch(
  //           openSnackbar({
  //             open: true,
  //             message: 'Customer add successfully.',
  //             variant: 'alert',
  //             alert: {
  //               color: 'success'
  //             },
  //             close: false
  //           })
  //         );
  //       }

  //       setSubmitting(false);
  //       onCancel();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // });
  const methods = useForm<ManipulateCustomerForm>({
    mode: "all",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment     
                      // @ts-ignore
    resolver: yupResolver(CustomerSchema),
    defaultValues: defaultValue,
  });

  const roles = mockRole; // TODO: load from be
  useEffect(() => {
    console.log("Error =>", methods.formState?.errors);
  }, [methods.formState.errors]);

  return (
    <>
      <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={methods.handleSubmit(async (data) => {
            if(isCreating){

              const res = await createCustomerHandler(data);
              if(res?.statusCode == "OK") {
                toast.success("Add customer successfully");
                onManipulateCallback()
              }else {
                toast.error(res?.message?? "There is some error try again later")
              }
              console.log(res);
            }else {
              const res = await updateCustomerHandler(data, customer);
              if(res?.statusCode == "OK") {
                toast.success("update customer successfully");
                onManipulateCallback()
              }else {
                toast.error(res?.message?? "There is some error try again later")
              }
            }
          })}>
          <DialogTitle>
            {customer ? "Edit Customer" : "New Customer"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <CustomerManipulateForm roles={roles} customer={customer} isCreating={isCreating} />
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
                    {customer ? "Edit" : "Add"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </FormProvider>
    </>
  );
};

export default AddCustomerModal;
