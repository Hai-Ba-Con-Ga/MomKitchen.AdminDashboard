import { KitchenAdmin } from "@/types/@mk/entity/kitchen";
import { Refresh } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import IconButton from "@ui/@extended/IconButton";
import MainCard from "@ui/MainCard";
import DeleteConfirmDialog from "@ui/common/dialogs/DeleteConfirmDialog";
import QuickTable from "@ui/common/table/QuickTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useKitchenData from "../hook/useKitchenData";
import useKitchenTable from "../hook/useKitchenTable";

const KitchenListPage = () => {
  // const data = useMemo(()=>{
  //     return mockKitchenAdmin
  // },[])
  // const [addToggle, setAddToggle] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();
  const { columnsDef } = useKitchenTable({
    handleEditClick: () => console.log("TODO: implement"),
    handleDeleteClick: (id) => {
      setDeleteConfirmation(true);
      setDeleteId(id);
    },
  });
  const nav = useNavigate();
  const {
    setPagination,
    setSortState,
    setKeyword,
    kitchenData: data,
    totalRows,
    deleteKitchen: { mutateAsync },
    refreshKitchenData,
  } = useKitchenData();
  useEffect(() => {
    console.log(totalRows);
  }, [totalRows]);
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
            <IconButton
              aria-label="close"
              onClick={() => refreshKitchenData()}
              color={"secondary"}
              sx={{}}>
              <Refresh />
            </IconButton>
          </>
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
