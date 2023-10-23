import {
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useEffect } from "react";

// third-party
import { AimOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Avatar from "@ui/@extended/Avatar";
import MainCard from "@ui/MainCard";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedbackCard from "../components/card/FeedbackCard";
import useKitchenData from "../hook/useKitchenData";

const KitchenProfile = () => {
  const matchDownMD = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { id } = useParams();
  const {
    kitchenDetail,
    setId,
    setOwnerId,
    ownerDetail,
    detailState: { isLoadingDetail },
  } = useKitchenData();
  useEffect(() => {
    if (kitchenDetail?.data?.owner?.ownerId) {
      setOwnerId(kitchenDetail?.data?.owner?.ownerId);
    }
  }, [kitchenDetail]);
  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip
                      label={`KIT-${kitchenDetail?.data?.no}`}
                      size="small"
                      color="primary"
                    />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    {kitchenDetail?.data?.owner?.ownerAvatarUrl ? (
                      <Avatar
                        sx={{
                          width: "10rem",
                          height: "10rem",
                        }}
                        alt="Avatar 1"
                        size="xl"
                        src={kitchenDetail?.data?.owner?.ownerAvatarUrl}
                      />
                    ) : (
                      <Skeleton
                        variant="circular"
                        width={"10rem"}
                        height={"10rem"}
                      />
                    )}

                    <Stack spacing={0.5} alignItems="center">
                      {kitchenDetail?.data?.name ? (
                        <Typography variant="h5">
                          {kitchenDetail?.data?.name}
                        </Typography>
                      ) : (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                          width={"10rem"}
                        />
                      )}
                      {/* <Typography color="secondary">Project Manager</Typography> */}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      {kitchenDetail?.data?.noOfDish ? (
                        <Typography variant="h5">
                          {kitchenDetail?.data?.noOfDish}
                        </Typography>
                      ) : (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                          width={"5rem"}
                        />
                      )}
                      <Typography color="secondary">Dish</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      {kitchenDetail?.data?.noOfTray != null &&
                      kitchenDetail?.data?.noOfTray >= 0 ? (
                        <Typography variant="h5">
                          {kitchenDetail?.data?.noOfTray}
                        </Typography>
                      ) : (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                          width={"5rem"}
                        />
                      )}

                      <Typography color="secondary">Tray</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      {kitchenDetail?.data?.noOfTray != null &&
                      kitchenDetail?.data?.noOfTray >= 0 ? (
                        <Typography variant="h5">1.5K</Typography>
                      ) : (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                          width={"5rem"}
                        />
                      )}

                      <Typography color="secondary">Order</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    sx={{ py: 0, "& .MuiListItem-root": { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        {ownerDetail?.email ? (
                          <Typography align="right">
                            {ownerDetail?.email}
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        {ownerDetail?.phone ? (
                          <Typography align="right">
                            {ownerDetail?.phone}
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AimOutlined rev={{}} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        {kitchenDetail?.data?.area?.name ? (
                          <Typography align="right">
                            {kitchenDetail?.data?.area?.name}
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemIcon>
                          <EnvironmentOutlined rev={{}}/>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Link align="right" href="https://google.com" target="_blank">
                            https://anshan.dh.url
                          </Link>
                        </ListItemSecondaryAction>
                      </ListItem> */}
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
              <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                  more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
                </Typography>
              </MainCard>
            </Grid> */}
          <Grid item xs={12}>
            <MainCard title="Owner Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Fullname</Typography>
                        {ownerDetail?.fullName ? (
                          <Typography>{ownerDetail?.fullName}</Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">DoB</Typography>
                        {!isLoadingDetail ? (
                          <Typography>Mr. Deepen Handgun</Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        {!isLoadingDetail ? (
                          <Typography>
                            <NumberFormat
                              value={ownerDetail?.phone}
                              displayType="text"
                              type="text"
                              format="#### ### ###"
                            />
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        {!isLoadingDetail ? (
                          <Typography>
                            {kitchenDetail?.data?.area?.name}
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        {!isLoadingDetail ? (
                          <Typography>{ownerDetail?.email}</Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        
                      {!isLoadingDetail ? (
                         <Typography>956 754</Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    {!isLoadingDetail ? (
                        <Typography>{kitchenDetail?.data?.address}</Typography>
                        ) : (
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                            width={"7rem"}
                          />
                        )}
                    
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
        <Grid mt={3}>
          <MainCard title="Feedback">
            <List sx={{ py: 0 }}>
              <Swiper
                style={{ paddingBottom: "2rem" }}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                autoplay
                direction="horizontal"
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}>
                <SwiperSlide>
                  <FeedbackCard
                    avatarUrl="https://source.unsplash.com/random"
                    content="Hihi"
                    customerName="Phong"
                    rating={3.5}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeedbackCard
                    avatarUrl="https://source.unsplash.com/random"
                    content="Hihi"
                    customerName="Phong"
                    rating={3.5}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeedbackCard
                    avatarUrl="https://source.unsplash.com/random"
                    content="Hihi"
                    customerName="Phong"
                    rating={3.5}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeedbackCard
                    avatarUrl="https://source.unsplash.com/random"
                    content="Hihi"
                    customerName="Phong"
                    rating={3.5}
                  />
                </SwiperSlide>
              </Swiper>
              {/* <FeedbackCard avatarUrl="https://source.unsplash.com/random" content="Hihi" customerName="Phong" rating={3.5}/> */}
            </List>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default KitchenProfile;
