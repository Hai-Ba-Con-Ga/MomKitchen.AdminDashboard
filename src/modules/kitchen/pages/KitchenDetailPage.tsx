import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import useKitchenData from '../hook/useKitchenData'
import MainCard from '@ui/MainCard'
import { Box } from '@mui/system'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'


const KitchenDetailPage = () => {
    const {id} = useParams()
 
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Profile" component={Link} to={`/kitchen/${id}/`} icon={<UserOutlined rev={{}} />} iconPosition="start" />
            <Tab label="Meals" component={Link} to={`/kitchen/${id}/meals`} icon={<FileTextOutlined rev={{}} />} iconPosition="start" />
            <Tab label="Dishes" component={Link} to={`/kitchen/${id}/dishes`} icon={<FileTextOutlined rev={{}} />} iconPosition="start" />
            <Tab label="Trays" component={Link} to={`/kitchen/${id}/trays`} icon={<FileTextOutlined rev={{}} />} iconPosition="start" />

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
}

export default KitchenDetailPage