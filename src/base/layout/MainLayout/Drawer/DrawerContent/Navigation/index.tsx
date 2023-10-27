// import { useSelector } from 'react-redux';

// material-ui
import { Box, Typography } from "@mui/material";

// types

// project import
import { menuWithDrawerOpen } from "@/base/store/selectors/app";
import { useRecoilValue } from "recoil";
import menuItem from "../../../../../menu-items";
import NavGroup from "./NavGroup";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  // const menu = useSelector((state: RootStateProps) => state.menu);
  // const { drawerOpen } = menu;
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);
  
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    // TODO
    <Box sx={{ pt: drawerOpen ? 2 : 0, "& > ul:first-of-type": { mt: 0 }}}>
      {navGroups}
    </Box>
  );
};

export default Navigation;
