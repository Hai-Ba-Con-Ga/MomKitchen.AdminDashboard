import React, { useEffect } from 'react'
import {
    BugFilled,
    ClockCircleFilled,
    MobileFilled,
    TwitterCircleFilled,
    WarningFilled
  } from "@ant-design/icons";
  import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    Typography
  } from "@mui/material";
  import { Box, Stack, useTheme } from "@mui/system";
  import Avatar from "@ui/@extended/Avatar";
  import MainCard from "@ui/MainCard";
  import NumberFormat from "react-number-format";
  import { Link as RouterLink } from "react-router-dom";
  
  import { useMediaQuery } from "@mui/material";
import HereMap from '@ui/common/map/HereMap';
import { AreaAdmin } from '@/types/@mk/entity/area';
import useAreaData from '../hooks/useAreaData';
import QuickTable from '@ui/common/table/QuickTable';
import useKitchenTable from '@/modules/kitchen/hook/useKitchenTable';
import { KitchenAdmin } from '@/types/@mk/entity/kitchen';

interface Props {
    onCancel: ()=> void;
    area?: AreaAdmin
}

const ViewAreaDetail = ({onCancel, area}:Props) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
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