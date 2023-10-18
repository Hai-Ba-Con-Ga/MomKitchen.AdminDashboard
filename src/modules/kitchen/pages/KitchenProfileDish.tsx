import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import DishCard from "../components/card/DishCard";
import AddSkeletonCard from "../components/card/AddSkeletonCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { mockDishes } from "@/data/@mk/mock/Dish";
import { Button, DialogContentText, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { BlockOutlined } from "@mui/icons-material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Dish } from "@/types/@mk/entity/dish";
import { isEmpty } from "lodash";
import DishAddForm from "../components/form/DishAddForm";
const mockData = [{}, {}, {}];
const KitchenProfileDish = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();
  const [addToggle, setAddToggle] = useState(false);
  const [editDish, setEditDish] = useState<Dish>();
  const handleEditDish = (dish:Dish)=>{
    setAddToggle(true);
    setEditDish(dish)
  }
  const handleDeleteDish = (id :string)=> {
    setDeleteId(id);
    setDeleteConfirmation(true);
  }
  return (
    <Box component="div">
      <Stack direction="row">
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          direction="horizontal"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {mockDishes.map((dish, i) => (
            <SwiperSlide>
              <DishCard dish={dish} key={i} onEdit={handleEditDish} onDelete={handleDeleteDish} />
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
          onClose={() => {setAddToggle(false); setEditDish(null)}
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
               {isEmpty(editDish) ? "Add new dish" :"Update dish"}
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
  );
};

export default KitchenProfileDish;
