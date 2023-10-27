import { Meal } from "@/types/@mk/entity/meal";
import { imageUrl } from "@/utils/@mk/helper";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import {
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
} from "@mui/material";
import MainCard from "@ui/MainCard";
import moment from "moment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {
  meal: Meal;
  onEdit?: (dish: Meal) => void;
  onDelete: (id: string) => void;
};

const MealCard = ({ meal, onEdit, onDelete }: Props) => {
  const theme = useTheme();
  return (
    <MainCard
      content={false}
      sx={{
        maxWidth: "25rem",
        width: "100%"
        // aspectRatio : "3/4"
        // maxHeight: "24rem"
      }}>
      <CardContent>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {meal?.name}
        </Typography>
        {/* <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            //  -webkit-line-clamp: 3,
            //  -webkit-box-orient: vertical
          }}>
          {meal.description}
        </Typography> */}

        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          pagination={true}
          modules={[Pagination]}
          direction="horizontal"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {meal?.tray?.dishes?.map((dish) => (
            <SwiperSlide
              key={dish?.id}
              style={{
                width: "100%",
              }}>
              <MainCard
                content={false}
                sx={{
                  width: "10rem",
                  // aspectRatio : "3/4"
                  // maxHeight: "24rem"
                }}>
                <CardMedia
                  sx={{
                    aspectRatio: "4/3",
                  }}
                  component="img"
                  image={imageUrl(dish?.imageUrl)}
                  alt="green iguana"
                />
                <CardContent sx={{ flex: "1 1 auto" }}>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {dish.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      //  -webkit-line-clamp: 3,
                      //  -webkit-box-orient: vertical
                    }}>
                    Qty: {Math.floor(Math.random() * 4)}
                  </Typography>
                </CardContent>
              </MainCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <Grid container spacing={3}>
          <Grid
            item
            xs={6}
            lg={3}
            >
              <Stack spacing={0.5}>
                  <Typography color="secondary">Serve from</Typography>
                  <Typography>
                      {moment(meal?.serviceFrom).format(
                        "DD/MM/yyyy HH:mm"
                      )}</Typography>
                </Stack>
            </Grid>
          <Grid
            item
            xs={6}
            lg={3}
            >
              <Stack spacing={0.5}>
                  <Typography color="secondary">Serve to</Typography>
                  <Typography>
                      {moment(meal?.serviceTo).format(
                        "DD/MM/yyyy HH:mm"
                      )}</Typography>
                </Stack>
            </Grid>
          <Grid
            item
            xs={6}
            lg={3}
            >
              <Stack spacing={0.5}>
                  <Typography color="secondary">Price</Typography>
                  <Typography>
                    {meal?.price}đ</Typography>
                </Stack>
            </Grid>
          <Grid
            item
            xs={6}
            lg={3}
            >
              <Stack spacing={0.5}>
                  <Typography color="secondary">Serve to</Typography>
                  <Typography>
                     {meal?.serviceQuantity}</Typography>
                </Stack>
            </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <ToggleButtonGroup
        fullWidth
        color="primary"
        exclusive
        aria-label="text alignment"
        size="small"
        sx={{
          p: 1,
          "& .MuiToggleButton-root": {
            borderRadius: 0,
            p: 0.75,
            "&:not(.Mui-selected)": {
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            },
            "&:first-of-type": {
              borderLeftColor: "transparent",
            },
            "&:last-of-type": {
              borderRightColor: "transparent",
            },
            "&:hover": {
              bgcolor: "transparent",
              color: theme.palette.primary.main,
            },
          },
        }}>
        <ToggleButton value="android" aria-label="android" disableRipple>
          <EditOutlined rev={{}} onClick={() => onEdit(meal)} />
        </ToggleButton>
        <ToggleButton value="ios" aria-label="ios" disableRipple>
          {/* <EllipsisOutlined rev={{}} /> */}
          <DeleteTwoTone
            rev={{}}
            onClick={() => onDelete(meal.id)}
            color={theme.palette.error.A700}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </MainCard>
  );
};

export default MealCard;
