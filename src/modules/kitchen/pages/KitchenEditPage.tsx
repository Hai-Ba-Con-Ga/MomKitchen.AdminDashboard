

import useAreaData from "@/modules/area/hooks/useAreaData";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  TextField
} from "@mui/material";
import { Stack } from "@mui/system";
import MainCard from "@ui/MainCard";
import HereMapSelect from "@ui/common/map/HereMapSelect";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useKitchenData from "../hook/useKitchenData";
import useKitchenForm, { KitchenForm } from "../hook/useKitchenForm";
import { AreaOptions } from "./KitchenCreatePage";

const KitchenEditPage = () => {
    const nav = useNavigate();
    const {id} = useParams();
    const {setId, kitchenDetail} = useKitchenData();
  const [areaOptions, setAreaOptions] = useState<AreaOptions[]>([]);
  const [areaKeyword, setAreaKeyword] = useState("");
  const [selectedArea, setSelectedArea] = useState<AreaOptions>(null);
  const { updateKitchenHandler } = useKitchenForm();
  const [position, setPosition] = useState<{ lat: number; lng: number }>();

  const methods = useForm<KitchenForm>({
    mode: "all",
    // resolver: yupResolver(CustomerSchema),
  });
  const { setValue } = methods;
  const { areaData } = useAreaData();

  const handleAutoAreaInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setAreaKeyword(value);
  };
  useEffect(()=>{
    if(id){
        setId(id);
    }
  },[id])
  useEffect(()=>{
    if(kitchenDetail?.data && kitchenDetail?.data?.location ){
        setPosition({
            lat: kitchenDetail?.data?.location?.lat,
            lng: kitchenDetail?.data?.location?.lng
        })
        setAreaKeyword(kitchenDetail?.data?.area?.name)
          setValue("areaId", kitchenDetail?.data?.areaId);
      setValue("name", kitchenDetail?.data?.name);


    }
  },[kitchenDetail])
  useEffect(() => {
    // fetchNewArea(areaKeyword);
    //TODO remove
    // setAreaOptions([]);
  }, [areaKeyword]);

 
  useEffect(() => {
    if (areaData) {
      setAreaOptions(
        areaData.map((area) => ({
          ...area,
          label: area.name,
        })) ?? []
      );
    }
  }, [areaData]);

  useEffect(() => {
    if (selectedArea) {
      setValue("areaId", selectedArea.id);
    }
  }, [selectedArea, setValue]);
  useEffect(() => {
    if (position) {
      setValue("position", position);
    }
  }, [position, setValue]);
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit((formValues) => {
          updateKitchenHandler(formValues,id );
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
                      {...methods.register("name", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: 600 }}>
                      Location
                    </InputLabel>
                    <HereMapSelect
                      onPositionChange={(pos) => setPosition(pos)}
                      area={selectedArea}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: 600 }}>
                      Area
                    </InputLabel>
                    <Autocomplete
                      disablePortal
                      id="auto-area"
                      options={areaOptions}
                      sx={{}}
                      onChange={(e, areaSelected) => {
                        setSelectedArea(areaSelected);
                      }}
                      onInputChange={handleAutoAreaInputChange}
                      filterOptions={(x) =>
                        x.filter((x) => x.name.includes(areaKeyword))
                      }
                      renderInput={(params) => (
                        <TextField value={areaKeyword} {...params} />
                      )}
                    />
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            gap={2}
            sx={{ mt: 4 }}
            justifyContent={"flex-end"}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => nav(-1)}>
              Cancle
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </MainCard>
      </Box>
    </FormProvider>
  );
};

export default KitchenEditPage;
