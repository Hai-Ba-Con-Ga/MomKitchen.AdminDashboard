import { Dish } from '@/types/@mk/entity/dish'
import { CameraOutlined } from '@ant-design/icons'
import { InputLabel, TextField } from '@mui/material'
import { FormHelperText } from '@mui/material'
import { FormControl } from '@mui/material'
import { FormLabel, Grid, Typography } from '@mui/material'
import { Box, Stack, useTheme } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import Avatar from '@ui/@extended/Avatar'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    dish?: Dish
}

const DishAddForm = ({dish}: Props) => {
    const theme = useTheme();
    const {register, formState : {errors}, control, setValue} = useForm();
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
      );
    
      const [avatar, setAvatar] = useState<string | undefined>();
      useEffect(() => {
        if (selectedImage) {
          setAvatar(URL.createObjectURL(selectedImage));
          setValue("avatar", selectedImage);
        }
      }, [selectedImage, setValue]);
    
  return (
    <Grid container spacing={2}>

      <Grid item xs={12} md={ 12}>
        <Grid container spacing={3}>
        { <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <FormLabel
            htmlFor="change-avtar"
            sx={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              "&:hover .MuiBox-root": { opacity: 1 },
              cursor: "pointer",
            }}>
            <Avatar
              alt="Avatar 1"
              src={avatar}
              sx={{ width: 120, height: 120, border: "1px dashed" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, .75)"
                    : "rgba(0,0,0,.65)",
                width: "100%",
                height: "100%",
                opacity: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Stack spacing={0.5} alignItems="center">
                <CameraOutlined
                  rev={{}}
                  style={{
                    color: theme.palette.secondary.lighter,
                    fontSize: "2rem",
                  }}
                />
                <Typography sx={{ color: "secondary.lighter" }}>
                  Upload
                </Typography>
              </Stack>
            </Box>
          </FormLabel>
          <TextField
            type="file"
            id="change-avtar"
            label="Outlined"
            variant="outlined"
            sx={{ display: "none" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedImage(e.target.files?.[0])
            }
          />
        </Stack>
      </Grid>}
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-name">Dish Name</InputLabel>
              <TextField
                fullWidth
                id="customer-name"
                placeholder="Enter dish name"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message as string}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="customer-email">Description</InputLabel>
              <TextField
                fullWidth
                maxRows={5}
                multiline
                id="customer-email"
                placeholder="Dish Description"
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DishAddForm