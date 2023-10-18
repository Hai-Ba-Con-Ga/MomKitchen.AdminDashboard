import React, { useEffect } from 'react'
import { Theme } from '@mui/material/styles';
import {
  useMediaQuery,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import MainCard from '@ui/MainCard';
import Avatar from '@ui/@extended/Avatar';
import LinearWithLabel from '@ui/@extended/Progress/LinearWithLabel';
import { useLocation, useParams } from 'react-router-dom';
import useKitchenData from '../hook/useKitchenData';

const KitchenProfile = () => {
    const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const {id} = useParams()
    const {kitchenDetail, setId} = useKitchenData()
    useEffect(()=>{
        setId(id);
    },[id,setId])
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MainCard>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip label="Pro" size="small" color="primary" />
                    </Stack>
                    <Stack spacing={2.5} alignItems="center">
                      <Avatar alt="Avatar 1" size="xl" src={"https://source.unsplash.com/random"} />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{kitchenDetail.data?.name}</Typography>
                        {/* <Typography color="secondary">Project Manager</Typography> */}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">86</Typography>
                        <Typography color="secondary">Dish</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">40</Typography>
                        <Typography color="secondary">Tray</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">4.5K</Typography>
                        <Typography color="secondary">Order</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                      <ListItem>
                        <ListItemIcon>
                          <MailOutlined  rev={{}}/>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">anshan.dh81@gmail.com</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PhoneOutlined rev={{}} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">(+1-876) 8654 239 581</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <AimOutlined rev={{}} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">New York</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <EnvironmentOutlined rev={{}}/>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Link align="right" href="https://google.com" target="_blank">
                            https://anshan.dh.url
                          </Link>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                  more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
                </Typography>
              </MainCard>
            </Grid> */}
            <Grid item xs={12}>
              <MainCard title="Owner Details">
                <List sx={{ py: 0 }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Full Name</Typography>
                          <Typography>Anshan Handgun</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Father Name</Typography>
                          <Typography>Mr. Deepen Handgun</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Phone</Typography>
                          <Typography>
                            (+1-876) <NumberFormat value={8654239581} displayType="text" type="text" format="#### ### ###" />
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Country</Typography>
                          <Typography>New York</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Email</Typography>
                          <Typography>anshan.dh81@gmail.com</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Zip Code</Typography>
                          <Typography>956 754</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Address</Typography>
                      <Typography>Street 110-B Kalians Bag, Dewan, M.P. New York</Typography>
                    </Stack>
                  </ListItem>
                </List>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>)
}

export default KitchenProfile