import { mockRole } from "@/data/@mk/mock/Role";
import { User } from "@/types/@mk/entity/user";
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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useCustomerForm, {
  ManipulateCustomerForm,
} from "../hook/useCustomerForm";
import CustomerManipulateForm from "./form/CustomerManipulateForm";

interface AddCustomerModalProps {
  isOpen?: boolean;
  // onCancel: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
  onCancel: () => void;
  customer: User;
}

const AddCustomerModal = ({
  customer,
  onCancel,
}: // isOpen,
AddCustomerModalProps) => {
  const isCreating = !customer;
  const defaultValue: ManipulateCustomerForm = !isCreating
    ? {
        autoPassword: true,
        birthday: customer?.birthday,
        email: customer?.email,
        phone: customer?.phone,
        fullname: customer?.fullName,
        status: customer?.customer?.status,
        role: customer?.roleId,
      }
    : { autoPassword: true };
  console.log(defaultValue);

  const { CustomerSchema, createCustomerHandler } = useCustomerForm();
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
    resolver: yupResolver(CustomerSchema),
    defaultValues: {
      autoPassword: true,
    },
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
            console.log("Add customer data => ", data);
            const res = await createCustomerHandler(data);
            console.log(res);
          })}>
          <DialogTitle>
            {customer ? "Edit Customer" : "New Customer"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <CustomerManipulateForm roles={roles} isCreating={isCreating} />
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
