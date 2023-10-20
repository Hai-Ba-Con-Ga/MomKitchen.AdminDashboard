import { CardContent, ToggleButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { CardMedia } from '@mui/material';
import Avatar from '@ui/@extended/Avatar';
import MainCard from '@ui/MainCard';
import React from 'react'

type Props = {
    customerName?: string;
    avatarUrl?:string;
    rating?:  number;
    content?: string;
}

const FeedbackCard = (props: Props) => {
    const {customerName, avatarUrl, rating, content} = props
  return (
    <MainCard content={false} sx={{
        paddingTop:"2rem",
        maxWidth: "20rem",
        // aspectRatio : "3/4"
        // maxHeight: "24rem"
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}>
      <Avatar
        sx={{
            
        }}
        
        src={avatarUrl ?? "https://source.unsplash.com/random"}
        // image={avatarUrl ?? "https://source.unsplash.com/random"}
        alt="green iguana"
      />
      <CardContent sx={{  display: "flex",
        flexDirection: "column",
        alignItems: "center", gap: ".5rem"}}>
        <Typography variant="h5" color="textSecondary" gutterBottom mb={0}>
          {customerName}
        </Typography>
        <Rating precision={0.5} name="size-small" value={rating} size="small" readOnly />

        <Typography variant="body1" sx={{
           overflow: "hidden",
           display: "-webkit-box",
           WebkitLineClamp: 3,
           WebkitBoxOrient : "vertical"
          //  -webkit-line-clamp: 3,
          //  -webkit-box-orient: vertical
        }}>
          {content}
        </Typography>
      </CardContent>
    </MainCard>
  )
}

export default FeedbackCard