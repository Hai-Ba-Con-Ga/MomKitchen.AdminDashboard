import { mockKitchenAdmin } from '@/data/@mk/mock/Kitchen'
import { KitchenAdmin } from '@/types/@mk/entity/kitchen'
import { DatePicker } from '@mui/x-date-pickers'
import MainCard from '@ui/MainCard'
import QuickTable from '@ui/common/table/QuickTable'
import { useMemo, useState } from 'react'
import useKitchenData from '../hook/useKitchenData'
import useKitchenTable from '../hook/useKitchenTable'
import { Dialog } from '@mui/material'
import AddKitchenModal from '../components/AddKitchenModal'

const KitchenListPage = () => {
    const data = useMemo(()=>{
        return mockKitchenAdmin
    },[])
    const [addToggle, setAddToggle] = useState<boolean>(false);
    const {columnsDef} = useKitchenTable({
        handleEditClick: ()=>console.log("TODO: implement")
        
    });
    const {setPagination,setSortState,setKeyword} = useKitchenData()
  return (
    <MainCard content={false}>
    
    <QuickTable<KitchenAdmin>
      columns={columnsDef}
      data={data ?? []}
      onPaginationChange={(pagination) => {
        setPagination(pagination);
      }}
      onRowSelectedChange={(rows) => console.log(rows)}
      addButton={{
        isShown: true,
        addButtonHandler: () => {
          // TODO : add action, nav page -> create/update
          setAddToggle(true)
        },
        buttonContentLangKey: "Add Kitchen",
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
     {addToggle && <Dialog
        maxWidth="sm"
        fullWidth
        onClose={()=>setAddToggle(false)}
        open={addToggle}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}>
        {addToggle && <AddKitchenModal onCancel={()=>setAddToggle(false)}/>}
      </Dialog>}

  </MainCard>
  )
}

export default KitchenListPage