import { mockKitchenAdmin } from '@/data/@mk/mock/Kitchen'
import { KitchenAdmin } from '@/types/@mk/entity/kitchen'
import { DatePicker } from '@mui/x-date-pickers'
import MainCard from '@ui/MainCard'
import QuickTable from '@ui/common/table/QuickTable'
import { useMemo, useState } from 'react'
import useKitchenData from '../hook/useKitchenData'
import useKitchenTable from '../hook/useKitchenTable'
import { Box, Dialog } from '@mui/material'
import AddKitchenModal from '../components/AddKitchenModal'
import { useNavigate } from 'react-router-dom'
import { DialogTitle } from '@mui/material'
import { BlockOutlined } from '@mui/icons-material'
import { DialogContentText } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { Button } from '@mui/material'

const KitchenListPage = () => {
    // const data = useMemo(()=>{
    //     return mockKitchenAdmin
    // },[])
    // const [addToggle, setAddToggle] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState<string>();
    const {columnsDef} = useKitchenTable({
        handleEditClick: ()=>console.log("TODO: implement"),
        handleDeleteClick:(id)=> {
            setDeleteConfirmation(true);
            setDeleteId(id);
        },
    });
    const nav = useNavigate();
    const {setPagination,setSortState,setKeyword, kitchenData:data, totalRows,deleteKitchen:{mutateAsync}, refreshKitchenData} = useKitchenData()
  return (
    <MainCard content={false}>
    
    <QuickTable<KitchenAdmin>
      columns={columnsDef}
      data={data ?? []}
      totalRows={totalRows}
      onPaginationChange={(pagination) => {
        setPagination(pagination);
      }}
      onRowSelectedChange={(rows) => console.log(rows)}
      addButton={{
        isShown: true,
        addButtonHandler: () => {
         nav("/kitchen/create");

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
     {deleteConfirmation && <Dialog
          open={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <Box
            sx={{ p: 1, py: 1.5, justifyContent: "center" }}
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}>
            <DialogTitle id="alert-dialog-title">
              <Box
                sx={{
                  placeItems: "center",
                }}
                display="grid">
                <BlockOutlined color="error" sx={{ fontSize: "4rem" }} />
              </Box>
              <DialogContentText
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
                id="alert-dialog-description">
                Are you sure you want to delete?
              </DialogContentText>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By deleting action, that user will not be able to use
                application no more.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={async () => {
                  //TODO : delete dish
                  await mutateAsync(deleteId);
                  await refreshKitchenData();
                  setDeleteConfirmation(false)}}>
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>}
      

  </MainCard>
  )
}

export default KitchenListPage