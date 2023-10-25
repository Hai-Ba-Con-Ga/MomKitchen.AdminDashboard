import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from 'react';
  
  import useKitchenTable from '@/modules/kitchen/hook/useKitchenTable';
import { AreaAdmin } from '@/types/@mk/entity/area';
import { KitchenAdmin } from '@/types/@mk/entity/kitchen';
// import { useMediaQuery } from "@mui/material";
import HereMap from '@ui/common/map/HereMap';
import QuickTable from '@ui/common/table/QuickTable';
import useAreaData from '../hooks/useAreaData';

interface Props {
    onCancel: ()=> void;
    area?: AreaAdmin
}

const ViewAreaDetail = ({onCancel, area}:Props) => {
    // const theme = useTheme();
    // const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    const {columnsDef} = useKitchenTable({
      handleDeleteClick: ()=>{"deleteclick"},
      handleEditClick: ()=>{
        console.log("editclick");
        
      }
    })
    const {areaKitchenData,totalKitchenRows, setKitchenPagination,setId} = useAreaData()
    useEffect(()=>{
      if(area?.id){
        setId(area?.id)
      }
    },[area?.id,setId])
    return (
        <>
        <DialogTitle><Typography variant='h3' mb={3}>{area?.name}</Typography></DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Stack>
            <HereMap area={area}/>
            <QuickTable<KitchenAdmin>
             columns={columnsDef}
             data={areaKitchenData ?? []}
             totalRows={totalKitchenRows}
             onPaginationChange={(pagination) => {
              setKitchenPagination(pagination);
             }}
             onRowSelectedChange={(rows) => console.log(rows)}
             onSearchKeywordChange={(q) => console.log(q)}
             onSortByChange={(sort) => console.log(sort)}
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  color="error"
                  onClick={() => {
                    onCancel();
                  }}>
                  Close
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
        </>
    );
}

export default ViewAreaDetail