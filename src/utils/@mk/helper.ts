import moment from "moment";

export const imageUrl = (rawUrl: string) => {
    if(!rawUrl.includes("http")){
        const s3Path = "https://momkitchen.s3.ap-southeast-1.amazonaws.com"
        return rawUrl.includes("momkitchen") ? rawUrl.replace("momkitchen", s3Path):"https://source.unsplash.com/random" 
        

    }else{
        return rawUrl;
    }
}
export function checkDueStatus(startDateStr: string, endDateStr: string): -1 | 0 | 1 {
    const currentDateTime = moment();
    const startDateTime = moment(startDateStr, 'DD/MM/YYYY HH:mm');
    const endDateTime = moment(endDateStr, 'DD/MM/YYYY HH:mm');
  
    if (currentDateTime.isBefore(startDateTime)) {
      // Upcoming
      return -1;
    } else if (currentDateTime.isBetween(startDateTime, endDateTime, undefined, '[]')) {
      // During
      return 0;
    } else {
      // Overdue
      return 1;
    }
  }