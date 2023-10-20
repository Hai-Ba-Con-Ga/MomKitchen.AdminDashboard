import React, { ReactNode, useState } from "react";
import MainCard from "@ui/MainCard";
import {
  Card,
  FormControl,
  IconButton,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";
import { Add, Download, Edit, Print, Share } from "@mui/icons-material";

import Avatar from "@ui/@extended/Avatar";
import { Typography } from "@mui/material";
import Logo from "@/assets/images/logo.png";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { OrderStatus } from "@/types/@mk/enum/orderStatus";
import { ListItemText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { isEmpty } from "lodash";
import SearchCustomerModal from "../../components/Modal/SearchCustomerModal";
import SearchKitchenModal from "../../components/Modal/SearchKitchenModal";
import { useNavigate } from "react-router-dom";

const OrderCreatePage = () => {
  const fontSizeCommon = "1rem";
  const nav = useNavigate();
  const {
    register,
    formState: { errors },
    control,
  } = useForm();
  const [customer, setCustomer] = useState<CustomerAdmin>(null);
  const [kitchen, setKitchen] = useState<KitchenAdmin>(null);
  const [openModalSelect, setOpenModalSelect] = useState<{
    isOpen: boolean;
    type: "customer" | "kitchen";
  }>({
    isOpen: false,
    type: "customer",
  });
  const handleOpenSelectCustomerModal = () => {
    setOpenModalSelect({
      isOpen: true,
      type: "customer",
    });
  };
  const handleOpenSelectKitchenModal = () => {
    setOpenModalSelect({
      isOpen: true,
      type: "kitchen",
    });
  };
  const handleCloseModal = () => {
    setOpenModalSelect({
      isOpen: false,
      type: "customer",
    });
  };
  const onSelectCustomerFromModal = (customer: CustomerAdmin) => {
    setCustomer(customer);
    handleCloseModal();
  };
  const onSelectKitchenFromModal = (kitchen: KitchenAdmin) => {
    setKitchen(kitchen);
    handleCloseModal();
  };
  return (
    <MainCard>
      <Stack direction="row" gap={3}>
        <Stack spacing={1.25} flexGrow={1}>
          <InputLabel htmlFor="customer-name">Status</InputLabel>
          <FormControl fullWidth>
            <Select
              id="column-hiding"
              displayEmpty
              {...register("status")}
              error={!!errors?.status}
              input={
                <OutlinedInput
                  id="select-column-hiding"
                  placeholder="Sort by"
                />
              }
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography variant="subtitle2">Select Status</Typography>
                  );
                }

                return (
                  <Typography variant="subtitle2">
                    {selected as ReactNode}
                  </Typography>
                );
              }}>
              {Object.keys(OrderStatus)
                .filter((item) => {
                  return isNaN(Number(item));
                })
                .map((column) => (
                  <MenuItem key={OrderStatus[column]} value={column}>
                    <ListItemText primary={column} />
                  </MenuItem>
                ))}
            </Select>
            {!!errors?.status && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login">
                {errors.status?.message as string}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={1.25} flexGrow={1}>
          <InputLabel htmlFor="customer-name">Order Date</InputLabel>
          <FormControl>
            <Controller
              name={"birthday"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <DatePicker
                    sx={{
                      "& fieldset": error
                        ? {
                            borderColor: "red",
                          }
                        : {},
                    }}
                    value={value}
                    onChange={(val) => {
                      onChange(val);
                    }}
                  />
                  {!!error && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login">
                      {error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1.25} flexGrow={1}>
          <InputLabel htmlFor="customer-name">Complete Date</InputLabel>
          <FormControl>
            <Controller
              name={"birthday"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <DatePicker
                    sx={{
                      "& fieldset": error
                        ? {
                            borderColor: "red",
                          }
                        : {},
                    }}
                    value={value}
                    onChange={(val) => {
                      onChange(val);
                    }}
                  />
                  {!!error && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login">
                      {error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Stack>
      </Stack>

      <Stack direction={"row"} mt={3} alignItems={"flex-end"} gap={3}>
        <MainCard sx={{ flexGrow: 1 }}>
          <Stack gap={0.5}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="subtitle1" fontSize={"1.25rem"}>
                Customer
              </Typography>
              {isEmpty(customer) ? (
                <Button
                  variant="dashed"
                  onClick={handleOpenSelectCustomerModal}>
                  <Add sx={{ mr: 1 }} />
                  Add
                </Button>
              ) : (
                <Button
                  variant="dashed"
                  onClick={handleOpenSelectCustomerModal}>
                  <Edit sx={{ mr: 1, fontSize: "1rem" }} />
                  Change
                </Button>
              )}
            </Stack>
            {!isEmpty(customer) && (
              <>
                <Typography
                  variant="subtitle2"
                  fontSize={fontSizeCommon}
                  color="GrayText">
                  {customer?.fullName}
                </Typography>
                {/* <Typography
                  variant="subtitle2"
                  fontSize={fontSizeCommon}
                  color="GrayText">
                  {customer?.status}
                </Typography> */}
                <Typography
                  variant="subtitle2"
                  fontSize={fontSizeCommon}
                  color="GrayText">
                    {customer?.phone}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontSize={fontSizeCommon}
                  color="GrayText">
                                      {customer?.email}

                </Typography>
              </>
            )}
          </Stack>
        </MainCard>
        <MainCard sx={{ flexGrow: 1 }}>
          <Stack gap={0.5}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="subtitle1" fontSize={"1.25rem"}>
                Kitchen
              </Typography>
              {isEmpty(kitchen) ? (
                <Button variant="dashed" onClick={handleOpenSelectKitchenModal}>
                  <Add sx={{ mr: 1 }} />
                  Add
                </Button>
              ) : (
                <Button variant="dashed" onClick={handleOpenSelectKitchenModal}>
                  <Edit sx={{ mr: 1, fontSize: "1rem" }} />
                  Change
                </Button>
              )}
            </Stack>
           { !isEmpty(kitchen) &&
            <>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              Belle J. Richter
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              1300 Mine RoadQuemado, NM 87829
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              305-829-7809
            </Typography>
                </>
            }
            {/* <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              belljrc23@gmail.com
            </Typography> */}
          </Stack>
        </MainCard>
      </Stack>
      <MainCard
        sx={{ mt: 3 }}
        title={
          <Typography variant="h4">Meal Information</Typography>
        }></MainCard>
      <Stack alignItems={"flex-end"} mt={3}>
        <Stack width="40%" gap={0.75}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Sub Total:
            </Typography>
            <Typography fontSize={fontSizeCommon}>$10464.55</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Discount:
            </Typography>
            <Typography fontSize={fontSizeCommon}>$52.32</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Tax:
            </Typography>
            <Typography fontSize={fontSizeCommon}>$20.93</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              Grand Total:
            </Typography>
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              $10433.16
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={6} justifyContent="flex-end" direction="row" gap={2}>
        <Button color="error" onClick={()=>nav(-1)}>Cancel</Button>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
      {openModalSelect.isOpen && (
        <>
          {openModalSelect.type === "kitchen" ? (
            <SearchKitchenModal
              onClose={handleCloseModal}
              onSelectKitchen={onSelectKitchenFromModal}
              open={openModalSelect.isOpen}></SearchKitchenModal>
          ) : (
            <SearchCustomerModal
              onClose={handleCloseModal}
              onSelectCustomer={onSelectCustomerFromModal}
              open={openModalSelect.isOpen}></SearchCustomerModal>
          )}
        </>
      )}
    </MainCard>
  );
};

export default OrderCreatePage;
