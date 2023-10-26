import { Add, Edit } from "@mui/icons-material";
import { FormControl, ListItem, MenuItem, Stack } from "@mui/material";
import MainCard from "@ui/MainCard";
import { ReactNode, useEffect, useState } from "react";

import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { OrderStatus } from "@/types/@mk/enum/orderStatus";
import {
  Button,
  FormHelperText,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { isEmpty } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SearchCustomerModal from "../../components/Modal/SearchCustomerModal";
import SearchKitchenModal from "../../components/Modal/SearchKitchenModal";
import useKitchenData from "@/modules/kitchen/hook/useKitchenData";
import { List } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Meal } from "@/types/@mk/entity/meal";
import { TextField } from "@mui/material";

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
  const [meal, setMeal] = useState<Meal>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [surcharge, setSurcharge] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
  const { setId, kitchenMeal } = useKitchenData();

  useEffect(() => {
    if (kitchen?.id) {
      setId(kitchen.id);
    }
  }, [kitchen, setId]);
  useEffect(() => {
    console.log(meal);
  }, [meal]);
useEffect(()=>{
  setSurcharge(meal?.price * 0.05)
},[quantity, meal?.price])
  useEffect(()=>{
    setTotalPrice(Math.floor(quantity * (meal?.price ?? 0) * 1.1)+surcharge)
  },[surcharge,meal?.price,quantity])
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
              name={"orderDate"}
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
        {/* <Stack spacing={1.25} flexGrow={1}>
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
        </Stack> */}
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
            {!isEmpty(kitchen) && (
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
            )}
            {/* <Typography
              variant="subtitle2"
              fontSize={fontSizeCommon}
              color="GrayText">
              belljrc23@gmail.com
            </Typography> */}
          </Stack>
        </MainCard>
      </Stack>

      <Stack spacing={1.25} mt={3} flexGrow={1}>
        <InputLabel htmlFor="customer-name">Meal</InputLabel>
        <FormControl fullWidth>
          <Select
            id="column-hiding"
            displayEmpty
            {...register("mealId")}
            error={!!errors?.mealId}
            input={
              <OutlinedInput id="select-column-hiding" placeholder="Sort by" />
            }
            renderValue={(selected) => {
              setMeal(
                kitchenMeal?.data?.filter((kit) => kit.id == selected)?.[0]
              );
              if (!selected) {
                return <Typography variant="subtitle2">Select Meal</Typography>;
              }

              return (
                <Typography variant="subtitle2">
                  {
                    kitchenMeal?.data?.filter((kit) => kit.id == selected)?.[0]
                      ?.name
                  }
                </Typography>
              );
            }}>
            {kitchenMeal?.data?.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                <ListItemText primary={column.name} />
              </MenuItem>
            ))}
          </Select>
          {/* {!!errors?.status && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login">
                {errors.status?.message as string}
              </FormHelperText>
            )} */}
        </FormControl>
      </Stack>
      <MainCard
        sx={{ mt: 3 }}
        title={<Typography variant="h4">Meal Information</Typography>}>
        <List sx={{ py: 0 }}>
          <ListItem divider={true}>
            <Box></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Meal Name</Typography>
                  <Typography>{meal?.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Serve Quantity</Typography>
                  <Typography>{meal?.serviceQuantity}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider={true}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Serve from</Typography>
                  <Typography>{meal?.serviceFrom}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Serve from</Typography>
                  <Typography>
                    <Typography>{meal?.serviceTo}</Typography>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider={true}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Quantity</Typography>
                  <TextField
                    fullWidth
                    id="customer-name"
                    type="number"
                    placeholder="Quantity"
                    {...register("quantity", {
                      onChange: (e) => {
                        setQuantity(Number.parseInt(e.target.value));
                      },
                    })}
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message as string}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary"> Unit price</Typography>
                  <Typography>
                    <Typography fontWeight={600}>{meal?.price}đ</Typography>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          {/* <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Tray</Typography>
                       <Typography>{data?.meal?.tray?.name}</Typography>
                      <Stack direction={"row"} gap={1}>
                        {
                          data?.meal?.tray?.dishies?.map(dish => <OrderDishCard data={dish}/>)
                        }
                      </Stack>
                    </Stack>
                  </ListItem> */}
          {/* <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Surcharge</Typography>
                      <TextField
                    fullWidth
                    id="customer-name"
                    type="number"
                    placeholder="Surcharge"
                    {...register("surcharge", {
                      onChange: (e) => {
                        setSurcharge(Number.parseInt(e.target.value));
                      },
                    })}
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message as string}
                  />
                    </Stack>
                  </ListItem> */}
        </List>
      </MainCard>
      <Stack alignItems={"flex-end"} mt={3}>
        <Stack width="40%" gap={0.75}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Sub Total:
            </Typography>
            <Typography fontSize={fontSizeCommon}>
              {quantity * (meal?.price ?? 0)}đ
            </Typography>
          </Stack>
          {/* <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Discount:
            </Typography>
            <Typography fontSize={fontSizeCommon}>$52.32</Typography>
          </Stack> */}
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Tax(VAT 10%):
            </Typography>
            <Typography fontSize={fontSizeCommon}>
              {quantity * (meal?.price ?? 0) * 0.1}đ
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={fontSizeCommon}
              variant="subtitle2"
              color="GrayText">
              Surcharge:
            </Typography>
            <Typography fontSize={fontSizeCommon}>
              {surcharge}đ
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              Grand Total:
            </Typography>
            <Typography fontSize={fontSizeCommon} variant="subtitle1">
              {totalPrice}đ
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={6} justifyContent="flex-end" direction="row" gap={2}>
        <Button color="error" onClick={() => nav(-1)}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
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
