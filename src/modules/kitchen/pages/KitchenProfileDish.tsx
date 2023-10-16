import { Box, Stack } from '@mui/system'
import React from 'react'
import DishCard from '../components/card/DishCard'
import {Swiper, SwiperSlide}  from "swiper/react"
import 'swiper/css';
const mockData = [{},{},{}]

const KitchenProfileDish = () => {

  return (
    <Box component="div">
        <Stack direction="row">
        <Swiper
      spaceBetween={50}
      slidesPerView={3}
      direction='horizontal'
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><DishCard/></SwiperSlide>
      <SwiperSlide><DishCard/></SwiperSlide>
      <SwiperSlide><DishCard/></SwiperSlide>
      <SwiperSlide><DishCard/></SwiperSlide>
    </Swiper>
           
        </Stack>
    </Box>
  )
}

export default KitchenProfileDish