import { Tray } from "@/types/@mk/entity/tray";
import { imageUrl } from "@/utils/@mk/helper";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import {
  CardContent,
  CardMedia,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import MainCard from "@ui/MainCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {
  tray?: Tray;
  onEdit: (dish: Tray) => void;
  onDelete: (id: string) => void;
};

const TrayCard = ({ tray, onEdit, onDelete }: Props) => {
  console.log(tray);

  const theme = useTheme();
  return (
    <MainCard
      content={false}
      sx={{
        maxWidth: "25rem",
        // aspectRatio : "3/4"
        // maxHeight: "24rem"
      }}>
      <CardMedia
        sx={{
          aspectRatio: "4/3",
        }}
        component="img"
        image={imageUrl(tray?.imgUrl)}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {tray.name}
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
          {tray.description}
        </Typography> */}
        {/* <Stack direction="row" gap={2}> */}
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          pagination={true}
          modules={[Pagination]}
          direction="horizontal"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {tray?.dishes?.map((dish) => (
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
        {/* </Stack> */}
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
          <EditOutlined rev={{}} onClick={() => onEdit(tray)} />
        </ToggleButton>
        <ToggleButton value="ios" aria-label="ios" disableRipple>
          {/* <EllipsisOutlined rev={{}} /> */}
          <DeleteTwoTone
            rev={{}}
            onClick={() => onDelete(tray.id)}
            color={theme.palette.error.A700}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </MainCard>
  );
};

export default TrayCard;
