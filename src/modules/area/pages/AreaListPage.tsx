import { mockAreaAdmin } from '@/data/@mk/mock/Area';
import { AreaAdmin } from '@/types/@mk/entity/area';
import { DatePicker } from '@mui/x-date-pickers';
import MainCard from '@ui/MainCard';
import QuickTable from '@ui/common/table/QuickTable';
import { useMemo } from 'react';
import useAreaData from '../hooks/useAreaData';
import useAreaTable from '../hooks/useAreaTable';



const AreaListPage = () => {
    const data = useMemo(()=>{
        return mockAreaAdmin;
    },[])
    const {columnsDef} = useAreaTable({
        handleEditClick: ()=>console.log("TODO: implement")
        
    });
    const {setPagination,setSortState,setKeyword} = useAreaData()
  return (
    <MainCard content={false}>
    
    <QuickTable<AreaAdmin>
      columns={columnsDef}
      data={data}
      onPaginationChange={(pagination) => {
        setPagination(pagination);
      }}
      onRowSelectedChange={(rows) => console.log(rows)}
      addButton={{
        isShown: true,
        addButtonHandler: () => {
          // TODO : add action, nav page -> create/update
        },
        buttonContentLangKey: "Add order",
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
  </MainCard>
  )
}

export default AreaListPage