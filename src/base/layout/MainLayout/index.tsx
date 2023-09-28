import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// material-ui
import { Box, Container, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import Breadcrumbs from '@/base/components/@extended/Breadcrumbs';
import useConfig from "@/base/hooks/useConfig";
import navigation from "@/base/menu-items";
import { menuWithDrawerOpen } from "@/base/store/selectors/app";
import { useRecoilState } from "recoil";
import Drawer from "./Drawer";
import Footer from "./Footer";
import Header from "./Header";
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));

  const { container, miniDrawer } = useConfig();
  const [drawerOpen,setDrawerOpen] = useRecoilState(menuWithDrawerOpen);

  // drawer toggler
  // const [open, setOpen] = useState(!miniDrawer || drawerOpen);
  const [open, setOpen] = useState(!miniDrawer || drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    // dispatch(openDrawer({ drawerOpen: !open }));
    setDrawerOpen(!drawerOpen);
  };

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setOpen(!matchDownLG);
      setDrawerOpen(!matchDownLG);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    // if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ width: "calc(100% - 260px)", flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {container && (
          <Container
            maxWidth="lg"
            sx={{
              px: { xs: 0, sm: 2 },
              position: "relative",
              minHeight: "calc(100vh - 110px)",
              display: "flex",
              flexDirection: "column",
            }}>
            <Breadcrumbs
              navigation={navigation}
              title
              titleBottom
              card={false}
              divider={false}
            />
            <Outlet />
            <Footer />
          </Container>
        )}
        {!container && (
          <Box
            sx={{
              position: "relative",
              minHeight: "calc(100vh - 110px)",
              display: "flex",
              flexDirection: "column",
            }}>
            <Breadcrumbs
              navigation={navigation}
              title
              titleBottom
              card={false}
              divider={false}
            />
            <Outlet />
            <Footer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;
