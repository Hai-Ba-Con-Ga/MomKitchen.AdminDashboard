import { Tray } from '@/types/@mk/entity/tray';
import {
  DeleteTwoTone,
  EditOutlined
} from "@ant-design/icons";
import { CardContent, CardMedia, Divider, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MainCard from "@ui/MainCard";
type Props = {
    tray?: Tray,
    onEdit : (dish:Tray)=>void;
    onDelete: (id: string)=>void
}

const TrayCard = ({tray, onEdit, onDelete}: Props) => {
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
      image={tray?.imgUrl ?? "https://source.unsplash.com/random"}
      alt="green iguana"
    />
    <CardContent>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        {tray.name}
      </Typography>
      <Typography variant="body1" sx={{
         overflow: "hidden",
         display: "-webkit-box",
         WebkitLineClamp: 3,
         WebkitBoxOrient : "vertical"
        //  -webkit-line-clamp: 3,
        //  -webkit-box-orient: vertical
      }}>
        {tray.description}
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
      
      <ToggleButton value="android" aria-label="android" disableRipple>
        <EditOutlined rev={{}} onClick={()=> onEdit(tray)} />
      </ToggleButton>
      <ToggleButton value="ios" aria-label="ios" disableRipple>
        {/* <EllipsisOutlined rev={{}} /> */}
        <DeleteTwoTone rev={{}} onClick={()=>onDelete(tray.id)} color={theme.palette.error.A700} />
      </ToggleButton>
    </ToggleButtonGroup>
  </MainCard>
  )
}

export default TrayCard