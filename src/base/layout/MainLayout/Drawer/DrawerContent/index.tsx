// import { useSelector } from "react-redux";

// material-ui
import { useMediaQuery, useTheme } from "@mui/material";

// project import
import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/third-party/SimpleBar";
import { menuWithDrawerOpen } from "@/base/store/selectors/app";
import { useRecoilValue } from "recoil";

// types
// import { RootStateProps } from '@/types/root';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // const menu = useSelector((state: RootStateProps) => state.menu);
  // const { drawerOpen } = menu;
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);

  return (
    <SimpleBar
      sx={{
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}>
      <Navigation />
      {drawerOpen && !matchDownMD && <NavCard />}
    </SimpleBar>
  );
};

export default DrawerContent;
