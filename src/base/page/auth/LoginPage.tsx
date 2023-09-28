import useAuth from '@/base/hooks/useAuth';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';
import AuthWrapper from './sections/AuthWrapper';
import AuthLogin from './sections/AuthLogin';


const LoginPage = () => {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn  = false;

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>)
}

export default LoginPage