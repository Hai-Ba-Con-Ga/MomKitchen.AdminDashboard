
export const imageUrl = (rawUrl: string) => {
    if(!rawUrl.includes("http")){
        const s3Path = "https://momkitchen.s3.ap-southeast-1.amazonaws.com"
        return rawUrl.includes("momkitchen") ? rawUrl.replace("momkitchen", s3Path):"https://source.unsplash.com/random" 
        

    }else{
        return rawUrl;
    }
}