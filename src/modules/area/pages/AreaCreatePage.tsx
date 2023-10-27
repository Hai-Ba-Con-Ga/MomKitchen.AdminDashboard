import { Area } from '@/types/@mk/entity/area';
import { Box, Button, Grid, InputLabel, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import MainCard from '@ui/MainCard';
import HereMapDrawArea from '@ui/common/map/HereMapDrawArea';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAreaData from '../hooks/useAreaData';


const AreaCreatePage = () => {
    const {register, setValue, handleSubmit, formState:{errors}} = useForm();
    const nav = useNavigate();
    const {createArea:{mutateAsync: createAreaFunc}} = useAreaData()
  return (
<MainCard>
  <Box component="form" onSubmit={handleSubmit(async(formValues)=>{
    const data = await createAreaFunc(formValues as Area);
    console.log(formValues);
    console.log("Result create area => ", data);
    if(data.statusCode =="OK"){
      nav("/area/list")
    }
    
  })}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
      <MainCard>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1, fontWeight: 600 }}>
              Area Name
            </InputLabel>
            <TextField
              {...register("name",{required: true})}
              sx={{ "& .MuiOutlinedInput-input": {} }}
              placeholder="Enter area name"
              fullWidth
              error={!!errors.name}
              helperText={errors?.name?.message as string}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1 }}>Location</InputLabel>
            <HereMapDrawArea onAreaChange={(points)=>{setValue("boundaries",points)}}/>
          </Grid>
       
        </Grid>
      </MainCard>
    </Grid>
  </Grid>
  <Stack direction="row" gap={2} sx={{mt : 4}} justifyContent={"flex-end"}>
          <Button variant="outlined" type="button" color="secondary" onClick={()=>nav(-1)}>Cancel</Button>
          <Button variant="contained" type='submit'>Save</Button>
  </Stack>
  </Box>
</MainCard>
  )
}

export default AreaCreatePage