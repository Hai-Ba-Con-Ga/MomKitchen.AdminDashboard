import { Dish } from "@/types/@mk/entity/dish";
import { Dialog, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import DeleteConfirmDialog from "@ui/common/dialogs/DeleteConfirmDialog";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import AddSkeletonCard from "../components/card/AddSkeletonCard";
import DishCard from "../components/card/DishCard";
import DishAddForm from "../components/form/DishAddForm";
import useDishData from "../hook/useDishData";
import useKitchenData from "../hook/useKitchenData";
const KitchenProfileDish = () => {
  const {id} = useParams();
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
  const {deleteDish: {mutateAsync : deleteDishFunc}} = useDishData()
  const {setIdGetDish, kitchenDish, refreshKitchenDishData} = useKitchenData();

  useEffect(()=>{
    setIdGetDish(id)
    setTimeout(()=>refreshKitchenDishData())
    
  },[id,setIdGetDish, refreshKitchenDishData])
  return (
    <Box component="div">
      <Stack direction="row">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          direction="horizontal"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
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
          {kitchenDish?.data?.map((dish, i) => (
            <SwiperSlide>
              <DishCard dish={dish} key={i} onEdit={handleEditDish} onDelete={handleDeleteDish} />
            </SwiperSlide>
          ))}

          
        </Swiper>
        { <Dialog
          open={addToggle}
          onClose={() => { setEditDish(null);setAddToggle(false);}
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
              <DishAddForm onCancel={()=>{setAddToggle(false); setEditDish(null);}} dish={editDish} onSuccessCallback={()=> refreshKitchenDishData()} kitchenId={id}/>
        </Dialog>}
      <DeleteConfirmDialog isOpen={deleteConfirmation} onCancel={()=> setDeleteConfirmation(false)} onConfirm={async()=>{
          await deleteDishFunc(deleteId);
          await refreshKitchenDishData();
          setDeleteConfirmation(false);
          toast.success("Delete successfully!")
        }} deleteConfirmContent="Delete permanently this dish from kitchen ? "/>
      </Stack>
    </Box>
  );
};

export default KitchenProfileDish;
