import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { mockDishes } from "@/data/@mk/mock/Dish";
import { Button, DialogContentText, Stack, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { BlockOutlined } from "@mui/icons-material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Dish } from "@/types/@mk/entity/dish";
import { isEmpty } from "lodash";
import { Box } from '@mui/system';
import DishCard from '../components/card/DishCard';
import AddSkeletonCard from '../components/card/AddSkeletonCard';
import { Tray } from '@/types/@mk/entity/tray';
import DishAddForm from '../components/form/DishAddForm';
import TrayCard from '../components/card/TrayCard';
import { mockTrays } from '@/data/@mk/mock/Tray';

const KitchenProfileTray = () => {

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();
  const [addToggle, setAddToggle] = useState(false);
  const [editTray, setEditTray] = useState<Tray>();
  const handleEditDish = (tray:Tray)=>{
    setAddToggle(true);
    setEditTray(tray)
  }
  const handleDeleteTray = (id :string)=> {
    setDeleteId(id);
    setDeleteConfirmation(true);
  }
  return (
    <Box component="div">
    <Stack direction="row">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        direction="horizontal"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {mockTrays.map((tray, i) => (
          <SwiperSlide>
            <TrayCard tray={tray} key={i} onEdit={handleEditDish} onDelete={handleDeleteTray} />
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <AddSkeletonCard
            onClick={() => {
              setAddToggle(true);
            }}
            cardContent={
              <Typography fontWeight={600}>Add new dish</Typography>
            }
          />
        </SwiperSlide>
      </Swiper>
      {addToggle && (<Dialog
        open={addToggle}
        onClose={() => {setAddToggle(false); setEditTray(null)}
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <Box
          sx={{ p: 1, py: 1.5, justifyContent: "center" }}
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}>
          <DialogTitle id="alert-dialog-title">
            <DialogContentText
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              id="alert-dialog-description">
             {isEmpty(editTray) ? "Add new dish" :"Update dish"}
            </DialogContentText>
          </DialogTitle>
          <DialogContent>
            <DishAddForm/>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setAddToggle(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                //TODO : delete dish
                setDeleteConfirmation(false)}}>
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>)}
      {deleteConfirmation &&  (
      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <Box
          sx={{ p: 1, py: 1.5, justifyContent: "center" }}
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}>
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                placeItems: "center",
              }}
              display="grid">
              <BlockOutlined color="error" sx={{ fontSize: "4rem" }} />
            </Box>
            <DialogContentText
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting action, that user will not be able to use
              application no more.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                //TODO : delete dish
                setDeleteConfirmation(false)}}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>)
      }
    </Stack>
  </Box>
  )
}

export default KitchenProfileTray