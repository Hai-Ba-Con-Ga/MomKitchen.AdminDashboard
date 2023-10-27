import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import MainCard from "@ui/MainCard";
import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const KitchenDetailPage = () => {
  const tabs = ["meals", "dishes", "trays"];
  const { id } = useParams();

  const location = useLocation();
  const pathname = location.pathname;
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [value, setValue] = useState(
    tabs.findIndex((value) => value === lastSegment) + 1
  );

  // Get the last segment (value)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value < 0 ? 0 : value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="account profile tab">
          <Tab
            label="Kitchen Profile"
            component={Link}
            defaultChecked
            to={`/kitchen/${id}/`}
            icon={<UserOutlined rev={{}} />}
            iconPosition="start"
          />
          <Tab
            label="Meals"
            component={Link}
            to={`/kitchen/${id}/meals`}
            icon={<FileTextOutlined rev={{}} />}
            iconPosition="start"
          />
          <Tab
            label="Dishes"
            component={Link}
            to={`/kitchen/${id}/dishes`}
            icon={<FileTextOutlined rev={{}} />}
            iconPosition="start"
          />
          <Tab
            label="Trays"
            component={Link}
            to={`/kitchen/${id}/trays`}
            icon={<FileTextOutlined rev={{}} />}
            iconPosition="start"
          />

          {/* <Tab
              label="My Account"
              component={Link}
              to="/apps/profiles/account/my-account"
              icon={<ContainerOutlined rev={{}} />}
              iconPosition="start"
            />
            <Tab label="Change Password" component={Link} to="/apps/profiles/account/password" icon={<LockOutlined rev={{}} />} iconPosition="start" />
            <Tab label="Role" component={Link} to="/apps/profiles/account/role" icon={<TeamOutlined rev={{}} />} iconPosition="start" />
            <Tab label="Settings" component={Link} to="/apps/profiles/account/settings" icon={<SettingOutlined rev={{}} />} iconPosition="start" /> */}
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default KitchenDetailPage;
