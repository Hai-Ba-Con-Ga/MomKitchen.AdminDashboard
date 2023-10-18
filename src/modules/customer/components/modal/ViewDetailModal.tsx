import React from "react";
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { Customer, CustomerAdmin } from "@/types/@mk/entity/customer";
import { DeleteFilled, EnvironmentOutlined, LinkOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import CustomerView from "../CustomerView";
import { TableCell } from "@mui/material";
import MainCard from "@ui/MainCard";
import Avatar from "@ui/@extended/Avatar";
import { Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemSecondaryAction } from "@mui/material";
import NumberFormat from "react-number-format";
import { Link } from "@mui/material";
import { calculateAge } from "@/base/utils/common";

import { useMediaQuery } from "@mui/material";
type Props = {
  customer?: CustomerAdmin | Customer;
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
                  width:"10rem",
                  height:"10rem",

                  aspectRatio: 1
                }}
                      alt="Avatar 1"
                      size="xl"
                      src={customer.user.avatarUrl}
                    />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{customer.user.fullName}</Typography>
                      <Typography color="secondary">
                        {customer.user.role?.name}
                      </Typography>
                    </Stack>
        </Stack>
        <Grid sx={{ "&:hover": { bgcolor: `transparent !important` } }}>
          <Grid colSpan={8} sx={{ p: 2.5 }}>
            <Grid
              container
              spacing={2.5}
              sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
              
              <Grid item xs={12} 
              sx={{width: "100%"}}
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
                              <Typography>{customer.user.fullName}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">
                                Father Name
                              </Typography>
                              <Typography>
                                Mr. {customer.user.fullName?.split(" ")?.[0]}{" "}
                                {customer.user.fullName?.split(" ")?.[1]}
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
                                  defaultValue={customer.user.phone}
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
                  <MainCard title="About me">
                    <Typography color="secondary">
                      Hello, I’m {customer.user.fullName} {customer.user.role?.name}{" "}
                      based in international company, {"Bio"}
                    </Typography>
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
