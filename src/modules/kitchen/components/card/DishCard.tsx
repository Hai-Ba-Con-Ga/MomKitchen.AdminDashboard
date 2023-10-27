import { Dish } from "@/types/@mk/entity/dish";
import { imageUrl } from "@/utils/@mk/helper";
import {
  DeleteTwoTone,
  EditOutlined
} from "@ant-design/icons";
import { CardContent, CardMedia, Divider, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MainCard from "@ui/MainCard";

interface Props {
  dish?:Dish,
  onEdit : (dish:Dish)=>void;
  onDelete: (id: string)=>void
}

const DishCard = ({dish,onEdit, onDelete }:Props) => {
  const theme = useTheme();
  return (
    <MainCard content={false} sx={{
        maxWidth: "20rem",
        // aspectRatio : "3/4"
        // maxHeight: "24rem"
    }}>
      <CardMedia
        sx={{
            aspectRatio: "4/3"
        }}
        component="img"
        image={imageUrl(dish?.imageUrl)}
        alt="green iguana"
      />
      <CardContent sx={{flex:"1 1 auto"}}>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {dish.name}
        </Typography>
        <Typography variant="body1" sx={{
           overflow: "hidden",
           display: "-webkit-box",
           WebkitLineClamp: 3,
           WebkitBoxOrient : "vertical"
          //  -webkit-line-clamp: 3,
          //  -webkit-box-orient: vertical
        }}>
          {dish.description}
        </Typography>
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
        {/* <ToggleButton value="web" aria-label="web" disableRipple>
          <SettingOutlined rev={{}} />
        </ToggleButton> */}
        <ToggleButton value="android" aria-label="android" disableRipple>
          <EditOutlined rev={{}} onClick={()=> onEdit(dish)} />
        </ToggleButton>
        <ToggleButton value="ios" aria-label="ios" disableRipple>
          {/* <EllipsisOutlined rev={{}} /> */}
          <DeleteTwoTone rev={{}} onClick={()=>onDelete(dish.id)} color={theme.palette.error.A700} />
        </ToggleButton>
      </ToggleButtonGroup>
    </MainCard>
  );
};

export default DishCard;
