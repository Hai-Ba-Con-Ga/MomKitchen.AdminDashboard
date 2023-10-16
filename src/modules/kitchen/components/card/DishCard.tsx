import {
    DeleteTwoTone,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
import { CardMedia } from "@mui/material";
import MainCard from "@ui/MainCard";
import React from "react";


const DishCard = () => {
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
        image={"https://source.unsplash.com/random"}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Card Subtitle
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non
          libero dignissim, viverra augue eu.
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
          <EditOutlined rev={{}} />
        </ToggleButton>
        <ToggleButton value="ios" aria-label="ios" disableRipple>
          {/* <EllipsisOutlined rev={{}} /> */}
          <DeleteTwoTone rev={{}} color={theme.palette.error.A700} />
        </ToggleButton>
      </ToggleButtonGroup>
    </MainCard>
  );
};

export default DishCard;
