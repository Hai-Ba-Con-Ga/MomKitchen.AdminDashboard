import { useMemo } from "react";

// material-ui
import { Box, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

// project import
// import useConfig from 'hooks/useConfig';
import Customization from "./Customization";
import Localization from "./Localization";
import MobileSection from "./MobileSection";
import Notification from "./Notification";
import Profile from "./Profile";
import Search from "./Search";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const { i18n } = useConfig();

  const matchesXs = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  // const localization = useMemo(() => <Localization />, [i18n]);
  const localization = useMemo(() => <Localization />, []);

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {!matchesXs && <Search />}
      {/* {!matchesXs && megaMenu} */}
      {!matchesXs && localization}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}

      <Notification />
      {/* <Message /> */}
      <Customization />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
