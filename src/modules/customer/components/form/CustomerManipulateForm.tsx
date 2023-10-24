import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";
import { Role } from "@/types/@mk/entity/role";
import { CustomerStatus } from "@/types/@mk/enum/customerStatus";
import { CameraOutlined } from "@ant-design/icons";
import {
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
  Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import Avatar from "@ui/@extended/Avatar";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ManipulateCustomerForm } from "../../hook/useCustomerForm";
type Props = {
  customer?: CustomerAdmin;
  isCreating?: boolean;
  roles: Role[];
  layout?: "split" | "stack"
};
import dayjs from "dayjs"
// const roles = []; // TODO: load from be

const CustomerManipulateForm = (props: Props) => {
  const { isCreating = true, layout = "split", customer } = props;
  const theme = useTheme();
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ManipulateCustomerForm>();
  const [autoPasswordToggle, setAutoPasswordToggle] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const [avatar, setAvatar] = useState<string | undefined>(customer?.avatarUrl??null);
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
      setValue("avatar", selectedImage);
    }
  }, [selectedImage, setValue]);
  useEffect(() => {
    console.log("Checked =>", autoPasswordToggle);
  }, [autoPasswordToggle]);

  return (
    <Grid container spacing={2}>
     { layout === "split" && <Grid item xs={12} md={3}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <FormLabel
            htmlFor="change-avtar"
            sx={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              "&:hover .MuiBox-root": { opacity: 1 },
              cursor: "pointer",
            }}>
            <Avatar
              alt="Avatar 1"
              src={avatar}
              sx={{ width: 120, height: 120, border: "1px dashed" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, .75)"
                    : "rgba(0,0,0,.65)",
                width: "100%",
                height: "100%",
                opacity: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Stack spacing={0.5} alignItems="center">
                <CameraOutlined
                  rev={{}}
                  style={{
                    color: theme.palette.secondary.lighter,
                    fontSize: "2rem",
                  }}
                />
                <Typography sx={{ color: "secondary.lighter" }}>
                  Upload
                </Typography>
              </Stack>
            </Box>
          </FormLabel>
          <TextField
            type="file"
            id="change-avtar"
            label="Outlined"
            variant="outlined"
            sx={{ display: "none" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedImage(e.target.files?.[0])
            }
          />
        </Stack>
      </Grid>}
      <Grid item xs={12} md={layout === "split" ? 8 : 12}>
        <Grid container spacing={3}>
        { layout === "stack" && <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <FormLabel
            htmlFor="change-avtar"
            sx={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              "&:hover .MuiBox-root": { opacity: 1 },
              cursor: "pointer",
            }}>
            <Avatar
              alt="Avatar 1"
              src={avatar}
              sx={{ width: 120, height: 120, border: "1px dashed" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, .75)"
                    : "rgba(0,0,0,.65)",
                width: "100%",
                height: "100%",
                opacity: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Stack spacing={0.5} alignItems="center">
                <CameraOutlined
                  rev={{}}
                  style={{
                    color: theme.palette.secondary.lighter,
                    fontSize: "2rem",
                  }}
                />
                <Typography sx={{ color: "secondary.lighter" }}>
                  Upload
                </Typography>
              </Stack>
            </Box>
          </FormLabel>
          <TextField
            type="file"
            id="change-avtar"
            label="Outlined"
            variant="outlined"
            sx={{ display: "none" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedImage(e.target.files?.[0])
            }
          />
        </Stack>
      </Grid>}
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-name">Full Name</InputLabel>
              <TextField
                fullWidth
                id="customer-name"
                placeholder="Enter Customer Full Name"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message as string}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-email">Email</InputLabel>
              <TextField
                fullWidth
                id="customer-email"
                placeholder="Customer Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-email">Phone</InputLabel>
              {/* <FormControl
              fullWidth
              id="customer-email"
              placeholder="Enter Customer Email"
              
              // {...getFieldProps('email')}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            > 
            </FormControl> */}
              <Controller
                name="phone"
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <MuiTelInput
                    value={value}
                    onChange={(value) => {
                      onChange(value);
                    }}
                    defaultCountry="VN"
                    helperText={error?.message}
                    error={!!error}
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-dob">Birthday</InputLabel>
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
          </Grid>
        {isCreating &&  <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-orderStatus">Status</InputLabel>
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
                        <Typography variant="subtitle1">
                          Select Status
                        </Typography>
                      );
                    }

                    return (
                      <Typography variant="subtitle2">
                        {selected as ReactNode}
                      </Typography>
                    );
                  }}>
                  {Object.keys(CustomerStatus)
                    .filter((item) => {
                      return isNaN(Number(item));
                    })
                    .map((column) => (
                      <MenuItem key={CustomerStatus[column]} value={column}>
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
          </Grid>}
          {/* <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-orderStatus">Role</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("role")}
                  id="column-hiding"
                  displayEmpty
                  input={
                    <OutlinedInput
                      id="select-column-hiding"
                      placeholder="Sort by"
                    />
                  }
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography variant="subtitle1">Select Role</Typography>
                      );
                    }

                    return (
                      <Typography variant="subtitle2">
                        {selected as ReactNode}
                      </Typography>
                    );
                  }}>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name.toUpperCase()}>
                      <ListItemText primary={role.name.toUpperCase()} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors?.role && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login">
                    {errors.role?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid> */}
          <Grid item xs={12}>
            {/* <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start">
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">
                Make Contact Info Public
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Means that anyone viewing your profile will be able to
                see your contacts details
              </Typography>
            </Stack>
            <FormControlLabel
              control={<Switch defaultChecked sx={{ mt: 0 }} />}
              label=""
              labelPlacement="start"
            />
          </Stack>
          <Divider sx={{ my: 2 }} /> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start">
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">
                  Auto generate password
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Controller
                name={"autoPassword"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        disabled={!isCreating}
                        sx={{ mt: 0 }}
                        checked={value}
                        onChange={(e, checked) => {
                          setAutoPasswordToggle(checked);
                          onChange(e, checked);
                        }}
                      />
                    }
                    label=""
                    labelPlacement="start"
                  />
                )}
              />
            </Stack>
          </Grid>
          {!autoPasswordToggle && (
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="customer-name">Password</InputLabel>
                <TextField
                  fullWidth
                  id="customer-name"
                  placeholder="Password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                />
              </Stack>
              <Stack spacing={1.25} mt={2}>
                <InputLabel htmlFor="customer-name">
                  Confirmation Password
                </InputLabel>
                <TextField
                  fullWidth
                  id="customer-name"
                  placeholder="Confirmation Password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message as string}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerManipulateForm;
