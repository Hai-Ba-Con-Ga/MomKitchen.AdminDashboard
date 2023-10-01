import { Dish } from '@/types/@mk/entity/dish'
import { Typography } from '@mui/material'
import MainCard from '@ui/MainCard'
import { Image } from '@ui/common/image'

type Props = {
    data : Dish
}

const OrderDishCard = ({data}: Props) => {
  return (
    <MainCard  title={data?.name} sx={{ height: '100%', 
      width : "100%"
    }}>
  <Image style={{
    marginBottom: "1rem"
  }} url={data?.imageUrl} />
  <Typography sx={{
    overflow: 'hidden',
    textOverflow: "ellipsis",
    display:"-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
    // -webkit-line-clamp: 2; 
    // -webkit-box-orient: vertical;
  }}  variant="caption" color="textSecondary">
    {data?.description}
  </Typography>
</MainCard>
  )
}

export default OrderDishCard