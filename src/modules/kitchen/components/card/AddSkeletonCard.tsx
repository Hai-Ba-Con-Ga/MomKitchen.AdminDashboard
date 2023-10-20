import { CardContent, useTheme } from "@mui/material";
import MainCard from "@ui/MainCard";
import React from 'react';

interface Props { 
    cardContent?: React.ReactNode,
    onClick?: ()=>void
}
const AddSkeletonCard = ({cardContent, onClick}:Props) => {
  const theme = useTheme();

  return (
    <MainCard content={false} sx={{
        maxWidth: "20rem",
        opacity: 0.8,
        // aspectRatio : "3/4"
        // maxHeight: "24rem"
        height: "99%",
        cursor : "pointer",
        borderColor : theme.palette.primary.main,
        borderStyle: "dashed",
        borderWidth: "2px",
        transition: "all 0.2s linear ",
        ":hover" : {
            opacity:1
        }
    }}
       onClick={onClick}
    >
      <CardContent sx={{
        height: "100%",
        display:"flex",
        justifyContent:"center",
        alignItems : "center",
        color : theme.palette.primary.main
      }} >
      {cardContent}
      </CardContent>     
    </MainCard>
  )
}

export default AddSkeletonCard