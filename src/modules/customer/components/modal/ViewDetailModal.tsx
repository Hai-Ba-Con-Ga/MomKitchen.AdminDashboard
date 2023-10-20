import { CustomerAdmin } from "@/types/@mk/entity/customer";
import {
  BugFilled,
  ClockCircleFilled,
  MobileFilled,
  TwitterCircleFilled,
  WarningFilled
} from "@ant-design/icons";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import Avatar from "@ui/@extended/Avatar";
import MainCard from "@ui/MainCard";
import NumberFormat from "react-number-format";
import { Link as RouterLink } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
type Props = {
  customer?: CustomerAdmin;
  onCancel?: () => void;
};

const ViewCustomerDetailModal = ({ customer, onCancel }: Props) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <DialogTitle>Customer Detail</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        {/* <CustomerView data={customer as CustomerAdmin} /> */}
        <Stack direction="column" gap={2} alignItems={"center"}>
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",

              aspectRatio: 1,
            }}
            alt="Avatar 1"
            size="xl"
            src={customer?.avatarUrl}
          />
          <Stack spacing={0.5} alignItems="center">
            <Typography variant="h5">{customer.fullName}</Typography>
            <Typography color="secondary">
              {customer.user?.role?.name}
            </Typography>
          </Stack>
        </Stack>
        <Grid sx={{ "&:hover": { bgcolor: `transparent !important` } }}>
          <Grid sx={{ p: 2.5 }}>
            <Grid container spacing={2.5} sx={{}}>
              <Grid
                item
                xs={12}
                sx={{ width: "100%" }}
                // sm={7} md={8} lg={9}
              >
                <Stack spacing={2.5}>
                  <MainCard title="Personal Details">
                    <List sx={{ py: 0 }}>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">
                                Full Name
                              </Typography>
                              <Typography>{customer?.fullName}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">
                                Father Name
                              </Typography>
                              <Typography>
                                Mr. {customer.fullName?.split(" ")?.[0]}{" "}
                                {customer.fullName?.split(" ")?.[1]}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Country</Typography>
                              <Typography>{"Vietnam"}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">
                                Zip Code
                              </Typography>
                              <Typography>
                                <NumberFormat
                                  displayType="text"
                                  format="### ###"
                                  mask="_"
                                  defaultValue={customer.phone}
                                />
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Address</Typography>
                          <Typography>{"Customer Address"}</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </MainCard>
                  <MainCard title="Recent Order">
                    <Grid
                      container
                      spacing={2.75}
                      alignItems="center"
                      sx={{
                        position: "relative",
                        "&>*": {
                          position: "relative",
                          zIndex: "5",
                        },
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          top: 10,
                          left: 42,
                          width: 2,
                          height: "100%",
                          background: "#ebebeb",
                          zIndex: "1",
                        },
                      }}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              type="filled"
                              color="success"
                              size="sm"
                              sx={{ top: 10 }}>
                              <TwitterCircleFilled rev={{}} />
                            </Avatar>
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            <Grid container spacing={0}>
                              <Grid item xs={12}>
                                <Typography
                                  align="left"
                                  variant="caption"
                                  color="secondary">
                                  8:50
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography align="left" variant="body2">
                                  You’re getting more and more followers, keep
                                  it up!
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              type="filled"
                              color="primary"
                              size="sm"
                              sx={{ top: 10 }}>
                              <ClockCircleFilled rev={{}} />
                            </Avatar>
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            <Grid container spacing={0}>
                              <Grid item xs={12}>
                                <Typography
                                  align="left"
                                  variant="caption"
                                  color="secondary">
                                  Sat, 5 Mar
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography align="left" variant="body2">
                                  Design mobile Application
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              type="filled"
                              color="error"
                              size="sm"
                              sx={{ top: 10 }}>
                              <BugFilled rev={{}} />
                            </Avatar>
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            <Grid container spacing={0}>
                              <Grid item xs={12}>
                                <Typography
                                  align="left"
                                  variant="caption"
                                  color="secondary">
                                  Sun, 17 Feb
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography align="left" variant="body2">
                                  <Link
                                    component={RouterLink}
                                    to="#"
                                    underline="hover">
                                    Jenny
                                  </Link>{" "}
                                  assign you a task{" "}
                                  <Link
                                    component={RouterLink}
                                    to="#"
                                    underline="hover">
                                    Mockup Design
                                  </Link>
                                  .
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              type="filled"
                              color="warning"
                              size="sm"
                              sx={{ top: 10 }}>
                              <WarningFilled rev={{}} />
                            </Avatar>
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            <Grid container spacing={0}>
                              <Grid item xs={12}>
                                <Typography
                                  align="left"
                                  variant="caption"
                                  color="secondary">
                                  Sat, 18 Mar
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography align="left" variant="body2">
                                  Design logo
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              type="filled"
                              color="success"
                              size="sm"
                              sx={{ top: 10 }}>
                              <MobileFilled rev={{}} />
                            </Avatar>
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            <Grid container spacing={0}>
                              <Grid item xs={12}>
                                <Typography
                                  align="left"
                                  variant="caption"
                                  color="secondary">
                                  Sat, 22 Mar
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography align="left" variant="body2">
                                  Design mobile Application
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                color="error"
                onClick={() => {
                  onCancel();
                }}>
                Close
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </Box>
  );
};

export default ViewCustomerDetailModal;
