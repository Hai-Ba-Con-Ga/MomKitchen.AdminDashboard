import { Dish } from '@/types/@mk/entity/dish'
import { CameraOutlined } from '@ant-design/icons'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack, useTheme } from '@mui/system'
import Avatar from '@ui/@extended/Avatar'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useDishForm, { DishAddForm } from '../../hook/useDishForm'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { isEmpty } from 'lodash'

type Props = {
    dish?: Dish,
    kitchenId?: string;
    onCancel: ()=>void;
    onSuccessCallback?: (newDish: Dish)=> void;
}

const DishAddForm = ({dish,kitchenId, onCancel, onSuccessCallback}: Props) => {
    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<any>();
    const isCreate = !dish;
    const {register, formState : {errors}, setValue, handleSubmit} = useForm<DishAddForm>({
    
    });
    const {createDishHandler,updateDishHandler} = useDishForm();
    
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
      );
    
      const [avatar, setAvatar] = useState<string | undefined>(()=>dish?.imageUrl);
      useEffect(() => {
        if (selectedImage) {
          setAvatar(URL.createObjectURL(selectedImage));
          setValue("imageFile", selectedImage);
        }
      }, [selectedImage, setValue]);
      useEffect(()=>{
        setValue("kitchenId", kitchenId)
      },[kitchenId, setValue])
  return (
    <>
    <DialogTitle id="alert-dialog-title">
      <DialogContentText
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
        id="alert-dialog-description">
       {isEmpty(dish) ? "Add new dish" :"Update dish"}
      </DialogContentText>
    </DialogTitle>
    <DialogContent>
    <Box component="form"  onSubmit={handleSubmit(async (formValues:DishAddForm)=>{
      if(isCreate){
        if(!kitchenId) {
          toast.error("There is some error, try again later")
          console.error("Missing kitchenId to create dish");
        }
        const result = await createDishHandler(formValues);
        if(result != null) {
          onSuccessCallback?.(result);
          onCancel();
        }
      }else {
        console.log("TODO : implement update dish",formValues);
        const result = await updateDishHandler(formValues, dish);
        if(result != null) {
          onSuccessCallback?.(result);
          onCancel();
        }
        
        
      }
    })}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={ 12}>
        <Grid container spacing={3}>
        { <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button type='submit' sx={{visibility:"hidden", width:0, minWidth:0, padding: 0}} ref={formRef}></Button>
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
                defaultValue={dish?.name??""}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message as string}
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
                defaultValue={dish?.description??""}
                id="customer-email"
                placeholder="Dish Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors?.description?.message as string}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Box>
    </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() =>onCancel() }>
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  formRef.current?.click();
                }}>
                Save
              </Button>
            </DialogActions>
    </>
  )
}

export default DishAddForm