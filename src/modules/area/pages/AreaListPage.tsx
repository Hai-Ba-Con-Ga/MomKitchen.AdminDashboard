import { mockAreaAdmin } from '@/data/@mk/mock/Area';
import { AreaAdmin } from '@/types/@mk/entity/area';
import { DatePicker } from '@mui/x-date-pickers';
import MainCard from '@ui/MainCard';
import QuickTable from '@ui/common/table/QuickTable';
import { useMemo, useState } from 'react';
import useAreaData from '../hooks/useAreaData';
import useAreaTable from '../hooks/useAreaTable';
import { useNavigate } from 'react-router-dom';
import HereMap from '@ui/common/map/HereMap';
import { Box, Dialog } from '@mui/material';
import ViewAreaDetail from '../component/ViewAreaDetail';



const AreaListPage = () => {
    // const data = useMemo(()=>{
    //     return mockAreaAdmin;
    // },[])
    const [viewDetail, setViewDetail] = useState<{
      isShown: boolean;
      detailArea: AreaAdmin;
    }>({
      isShown: false,
      detailArea: null,
    });
    const [viewDetailToggle, setViewDetailToggle] = useState<boolean>(false); 
    const {columnsDef} = useAreaTable({
        handleEditClick: ()=>console.log("TODO: implement"),
        handleViewClick: (area)=>{
          setViewDetail({isShown: true,detailArea: area})
          setViewDetailToggle(true)
        },
        handleDeleteClick: ()=> console.log("TODO: implement")
      });
    
    const {setPagination,setSortState,setKeyword, areaData,totalRows} = useAreaData()
    const nav = useNavigate();
  return (
    <MainCard content={false}>
    
    <QuickTable<AreaAdmin>
      columns={columnsDef}
      data={areaData??[]}
      onPaginationChange={(pagination) => {
        setPagination(pagination);
      }}
      totalRows={totalRows}
      onRowSelectedChange={(rows) => console.log(rows)}
      addButton={{
        isShown: true,
        addButtonHandler: () => {
          // TODO : add action, nav page -> create/update
          nav("/area/create")
        },
        buttonContentLangKey: "New Area",
      }}
      onSearchKeywordChange={(q) => setKeyword(q)}
      onSortByChange={(sort) => setSortState(sort)}
      actionComponents={
        <>
          <DatePicker
            // value={value}
            onChange={(val) => {
              console.log(typeof val);
            }}
          />
          <DatePicker
            // value={value}
            onChange={(val) => {
              console.log(typeof val);
            }}
          />
        </>
      }
    />
                  <Dialog
                    open={viewDetail.isShown}
                    onClose={() =>
                      setViewDetail({
                        isShown: false,
                        detailArea: null,
                      })
                    }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    {
                      <ViewAreaDetail
                      area={viewDetail.detailArea}
                        onCancel={() =>
                          setViewDetail({
                            isShown: false,
                            detailArea: null,
                          })
                        }
                      />
                    }
                  </Dialog>
  </MainCard>
  )
}

export default AreaListPage