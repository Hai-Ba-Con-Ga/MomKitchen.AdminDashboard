import { mockRole } from "@/data/@mk/mock/Role";
import CustomerManipulateForm from "@/modules/customer/components/form/CustomerManipulateForm";
import { Autocomplete, Button, Grid, InputLabel, Switch, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MainCard from "@ui/MainCard";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const KitchenCreatePage = () => {

  const nav = useNavigate();
  const [areaOptions,setAreaOptions] = useState<{areaId: string, areaName: string}[]>([]);
  const [areaKeyword, setAreaKeyword] = useState("");
  const [isCreateNewUser, setIsCreateNewUser] = useState(false); 
//   const handleCancel = () => {
//     nav(-1);
//   };
  const fetchNewArea = debounce((keyword)=>{
    return ""
  },400)
  const handleAutoAreaInputChange = (event: React.SyntheticEvent<Element, Event>, value: string)=> {
    setAreaKeyword(value);
  }
  useEffect(()=>{
    fetchNewArea(areaKeyword);
  //TODO remove
    setAreaOptions(null);

  },[areaKeyword])
  const methods = useForm<any>({
    mode: "all",
    // resolver: yupResolver(CustomerSchema),
    defaultValues: {
      autoPassword: true,
    },
  });

  return (
    <FormProvider {...methods}>

    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <MainCard>
            <Grid container spacing={1} direction="column">
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1, fontWeight: 600 }}>
                  Kitchen Name
                </InputLabel>
                <TextField
                  sx={{ "& .MuiOutlinedInput-input": {} }}
                  placeholder="Enter kitchen name"
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
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Area</InputLabel>
                <Autocomplete
                  disablePortal
                  id="auto-area"
                  options={areaOptions}
                  sx={{  }}
                  onInputChange={handleAutoAreaInputChange}
                  renderInput={(params) => <TextField value={areaKeyword} onChange={(e)=> setAreaKeyword(e.target.value)} {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1, fontWeight: 600 }}>User</InputLabel>
                <Stack direction="row" sx={{marginTop: "1rem"}}>

                {/* <Controller
                name={"autoPassword"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlLabel
                    control={ */}
                      <Switch
                        
                        sx={{ mt: 0 }}
                        checked={isCreateNewUser}
                        onChange={(e, checked) => {
                          setIsCreateNewUser(checked);
                        //   onChange(e, checked);
                        }}
                      />
                    {/* }
                    label=""
                    labelPlacement="start"
                  />
                )}
              /> */}
              <Typography>Create a new user?</Typography>
              </Stack>
              {
                isCreateNewUser ? 
                <>
                <CustomerManipulateForm layout="stack" roles={mockRole}/>
                </> : 
                <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1 }}></InputLabel>
                    <Autocomplete
                      disablePortal
                      id="auto-area"
                      options={areaOptions}
                      sx={{}}
                      onInputChange={handleAutoAreaInputChange}
                      renderInput={(params) => <TextField value={areaKeyword}  {...params} />}
                    />
                  </Grid>
              }
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Stack direction="row" gap={2} sx={{mt : 4}} justifyContent={"flex-end"}>
              <Button variant="outlined" color="secondary" onClick={()=>nav(-1)}>Cancle</Button>
              <Button variant="contained">Save</Button>
      </Stack>
    </MainCard>
    </FormProvider>

  );
};

export default KitchenCreatePage;
