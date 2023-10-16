import { Button, Typography } from '@mui/material';
import { Autocomplete, Grid, InputLabel, Switch, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import MainCard from '@ui/MainCard';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

type Props = {}

const AreaCreatePage = (props: Props) => {
    const methods = useForm();
    const nav = useNavigate();
  return (
         <FormProvider {...methods}>
<MainCard>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
      <MainCard>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1, fontWeight: 600 }}>
              Area Name
            </InputLabel>
            <TextField
              sx={{ "& .MuiOutlinedInput-input": {} }}
              placeholder="Enter area name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1 }}>Location</InputLabel>
            <TextField
              sx={{ "& .MuiOutlinedInput-input": {} }}
              placeholder="Enter your email"
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12}>
            <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
            <TextField
              sx={{ "& .MuiOutlinedInput-input": {} }}
              placeholder="Enter your category"
              fullWidth
            />
          </Grid> */}
        
        </Grid>
      </MainCard>
    </Grid>
  </Grid>
  <Stack direction="row" gap={2} sx={{mt : 4}} justifyContent={"flex-end"}>
          <Button variant="outlined" color="secondary" onClick={()=>nav(-1)}>Cancel</Button>
          <Button variant="contained">Save</Button>
  </Stack>
</MainCard>
</FormProvider>
  )
}

export default AreaCreatePage