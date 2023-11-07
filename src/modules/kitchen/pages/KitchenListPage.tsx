import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { Refresh } from "@mui/icons-material";
import IconButton from "@ui/@extended/IconButton";
import MainCard from "@ui/MainCard";
import DeleteConfirmDialog from "@ui/common/dialogs/DeleteConfirmDialog";
import QuickTable from "@ui/common/table/QuickTable";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import KitchenActionMenu from "../components/menu/KitchenActionMenu";
import useKitchenData from "../hook/useKitchenData";
import useKitchenTable from "../hook/useKitchenTable";

const KitchenListPage = () => {
  // const data = useMemo(()=>{
  //     return mockKitchenAdmin
  // },[])
  // const [addToggle, setAddToggle] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectionRows, setSelectionRows] = useState<string[]>();
  const [deleteId, setDeleteId] = useState<string>();
  const nav = useNavigate();

  const { columnsDef } = useKitchenTable({
    handleEditClick: (kitchen) => nav(`/kitchen/${kitchen?.id}/edit`),
    handleDeleteClick: (id) => {
      setDeleteConfirmation(true);
      setDeleteId(id);
    },
  });
  const {
    setPagination,
    setSortState,
    setKeyword,
    kitchenData: data,
    totalRows,
    deleteKitchen: { mutateAsync },
    refreshKitchenData,
  } = useKitchenData();
 
  const ActionBars = useMemo(()=>  <>
  <IconButton
    aria-label="close"
    onClick={() => refreshKitchenData()}
    color={"secondary"}
    sx={{}}>
    <Refresh />
  </IconButton>
  {selectionRows?.length>0 && 
  <KitchenActionMenu listData={data??[]} selectionRows={selectionRows} />
  }
</>
,[selectionRows, data])

  return (
    <MainCard content={false}>
      <QuickTable<KitchenAdmin>
        columns={columnsDef}
        data={data ?? []}
        totalRows={totalRows}
        onPaginationChange={(pagination) => {
          setPagination(pagination);
        }}
        onRowSelectedChange={(rows) => setSelectionRows(rows)}
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
          ActionBars
        }
      />
      {
        <DeleteConfirmDialog
          isOpen={deleteConfirmation}
          onCancel={() => setDeleteConfirmation(false)}
          onConfirm={async () => {
            //TODO : delete dish
            await mutateAsync(deleteId);
            await refreshKitchenData();
            setDeleteConfirmation(false);
          }}
        />
      }
    </MainCard>
  );
};

export default KitchenListPage;
