import { mockRole } from "@/data/@mk/mock/Role";
import useAreaData from "@/modules/area/hooks/useAreaData";
import CustomerManipulateForm from "@/modules/customer/components/form/CustomerManipulateForm";
import useUserData from "@/modules/order/hook/useUserData";
import { AreaAdmin } from "@/types/@mk/entity/area";
import { User } from "@/types/@mk/entity/user";
import { Box } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Autocomplete, Button, Grid, InputLabel, Switch, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MainCard from "@ui/MainCard";
import HereMapSelect from "@ui/common/map/HereMapSelect";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useKitchenForm, { KitchenForm } from "../hook/useKitchenForm";

interface AreaOptions extends AreaAdmin{
  label: string
}

interface UserOptions {
  userId: string, name: string,label: string, email: string, phone: string
}
const KitchenCreatePage = () => {

  const nav = useNavigate();
  const [areaOptions,setAreaOptions] = useState<AreaOptions[]>([]);
  const [userOptions,setUserOptions] = useState<UserOptions[]>([]);
  const [areaKeyword, setAreaKeyword] = useState("");
  const [userKeyword, setUserKeyword] = useState<string>("");
  const [isCreateNewUser, setIsCreateNewUser] = useState(false); 
  const [selectedArea, setSelectedArea] = useState<AreaOptions>(null);
  const [selectedUser, setSelectedUser] = useState<UserOptions>(null);
  const {setKeyword, setRoleName, userData, keyword,refetchData} = useUserData();
  const {createKitchenHandler} = useKitchenForm()
  const [position, setPosition] = useState<{lat:number, lng: number}>();

  const methods = useForm<KitchenForm>({
    mode: "all",
    // resolver: yupResolver(CustomerSchema),
  });
  const { setError,setValue,register,formState: {errors}} = methods
  const {areaData} = useAreaData();
//   const handleCancel = () => {
//     nav(-1);
//   };
  const fetchNewArea = debounce((keyword)=>{
    return []
  },400)
  const fetchNewUser = debounce((keyword)=>{
    setKeyword(keyword)
  },1000)
  const handleAutoAreaInputChange = (event: React.SyntheticEvent<Element, Event>, value: string)=> {
    setAreaKeyword(value);
  }
  const handleAutoUserInputChange = (event: React.SyntheticEvent<Element, Event>, value: string)=> {
    setUserKeyword(value);
  }
  useEffect(()=>{
    // fetchNewArea(areaKeyword);
  //TODO remove
    // setAreaOptions([]);
  },[areaKeyword])
  useEffect(()=>{    
    fetchNewUser(userKeyword);
  },[userKeyword])
  useEffect(()=>{
    refetchData();
  },[keyword]);
  useEffect(()=>{
    setUserOptions(userData?.map(user=>({userId: user?.id, email: user?.email, name : user?.fullName, label: user?.fullName,phone: user?.phone}))??[])
  },[userData])
  useEffect(()=>{
    if(areaData) {
      setAreaOptions(areaData.map(area=> ({
       ...area,
        label: area.name
      }))??[])
    }
  },[areaData])
  useEffect(()=>{
    if(selectedUser){
      setValue("userId", selectedUser.userId)
    }
  },[selectedUser])

  useEffect(()=>{
    if(selectedArea){
      setValue("areaId", selectedArea.id)
    }
  },[selectedArea,setValue])
  useEffect(()=>{
    if(position){
      setValue("position", position)
    }
  },[position, setValue])
  return (
    <FormProvider {...methods}>
    <Box component="form" onSubmit={methods.handleSubmit((formValues)=>{
      console.log(formValues);
      createKitchenHandler(formValues)
    })}>

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
                  {...methods.register("name", { required:true})}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1, fontWeight: 600  }}>Location</InputLabel>
                <HereMapSelect onPositionChange={(pos) => setPosition(pos)} area={selectedArea} />
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
                <InputLabel sx={{ mb: 1, fontWeight: 600  }}>Area</InputLabel>
                <Autocomplete
                  disablePortal
                  id="auto-area"
                  options={areaOptions}
                  sx={{  }}
                  onChange={(e,areaSelected)=>{setSelectedArea(areaSelected)}}
                  onInputChange={handleAutoAreaInputChange}
                  filterOptions={(x) => x.filter(x=>x.name.includes(areaKeyword))}
                  renderInput={(params) => <TextField value={areaKeyword}  {...params} />}
                  
                />
                 {/* <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login">
                          {method}
                        </FormHelperText> */}
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
                      id="auto-customer"
                      options={userOptions ?? []}
                      sx={{}}
                      onChange={(e,v )=> setSelectedUser(v)}
                      onInputChange={handleAutoUserInputChange}
                      inputValue={userKeyword}
                      filterOptions={x=>x}
                      renderInput={(params) => <TextField {...params} />}
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
              <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </MainCard>
    </Box>

    </FormProvider>

  );
};

export default KitchenCreatePage;
