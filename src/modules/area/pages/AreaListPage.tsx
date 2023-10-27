import { AreaAdmin } from "@/types/@mk/entity/area";
import { BlockOutlined, Map, Refresh } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import MainCard from "@ui/MainCard";
import HereMap, { PolygonArea } from "@ui/common/map/HereMap";
import QuickTable from "@ui/common/table/QuickTable";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewAreaDetail from "../component/ViewAreaDetail";
import useAreaData from "../hooks/useAreaData";
import useAreaTable from "../hooks/useAreaTable";

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
  const [toggleViewMap, setToggleViewMap] = useState<boolean>(true);
  const [viewDetailToggle, setViewDetailToggle] = useState<boolean>(false);
  const [confirmationToggle, setConfirmationToggle] = useState(false);
  const [actionId, setActionId] = useState<string>();
  const { columnsDef } = useAreaTable({
    handleEditClick: () => console.log("TODO: implement", viewDetailToggle),
    handleViewClick: (area) => {
      setViewDetail({ isShown: true, detailArea: area });
      setViewDetailToggle(true);
    },
    handleDeleteClick: (id) => {setActionId(id); setConfirmationToggle(true)},
  });

  const { setPagination, setSortState, setKeyword, areaData, totalRows, deleteArea:{mutateAsync : deleteAreaAsync},refreshAreaData } =
    useAreaData();
    const areaPolygons = useMemo<PolygonArea[]>(()=>{
      return areaData?.map(area => ({name: area?.name, coords: area?.boundaries}));
    },[areaData])
  const nav = useNavigate();
  return (
    <MainCard content={false}>
      {toggleViewMap && <HereMap polygons={areaPolygons}/>}
      <QuickTable<AreaAdmin>
        columns={columnsDef}
        data={areaData ?? []}
        onPaginationChange={(pagination) => {
          setPagination(pagination);
        }}
        totalRows={totalRows}
        onRowSelectedChange={(rows) => console.log(rows)}
        addButton={{
          isShown: true,
          addButtonHandler: () => {
            nav("/area/create");
          },
          buttonContentLangKey: "New Area",
        }}
        onSearchKeywordChange={(q) => setKeyword(q)}
        onSortByChange={(sort) => setSortState(sort)}
        actionComponents={
          <>
            <IconButton
              aria-label="close"
              onClick={() => setToggleViewMap(!toggleViewMap)}
              color={toggleViewMap ? "primary" : "secondary"}
              sx={{}}>
              <Map />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => refreshAreaData()}
              color={"secondary"}
              sx={{}}>
              <Refresh />
            </IconButton>
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
      {confirmationToggle && (
        <Dialog
          open={confirmationToggle}
          onClose={() => setConfirmationToggle(false)}
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
                Are you sure you want to delete this area?
              </DialogContentText>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Be careful, by deleting action, all of kitchens belong to that area are also removed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setConfirmationToggle(false)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={async () => {
                  await deleteAreaAsync(actionId);
                  setConfirmationToggle(false);
                  refreshAreaData()
                }}>
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </MainCard>
  );
};

export default AreaListPage;
