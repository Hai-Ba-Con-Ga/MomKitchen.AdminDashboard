import { BlockOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import MealCard from "../components/card/MealCard";
import DishAddForm from "../components/form/DishAddForm";
import useKitchenData from "../hook/useKitchenData";

const KitchenProfileMeal = () => {
  const { id } = useParams();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [deleteId, setDeleteId] = useState<string>();
  const [addToggle, setAddToggle] = useState(false);
  const handleDeleteTray = (id: string) => {
    setDeleteId(id);
    setDeleteConfirmation(true);
  };
  // const {} = useTrayData()
  const {
    setId,
    kitchenMeal,
    refreshKitchenTray,
    id: kitchenId,
  } = useKitchenData();

  useEffect(() => {
    console.log(id);

    setId(id);
  }, [id, setId]);
  useEffect(() => {
    console.log(kitchenId);

    if (kitchenId) {
      refreshKitchenTray();
    }
  }, [kitchenId, refreshKitchenTray]);
  return (
    <Box component="div">
      <Grid container spacing={3}>
        {/* <Grid item xs={6} lg={4}>
            <AddSkeletonCard
              onClick={() => {
                setAddToggle(true);
              }}
              cardContent={<Typography fontWeight={600}>Add new dish</Typography>}
            />
          </Grid> */}
        {kitchenMeal?.data?.map((meal, i) => (
          <Grid item xs={6} lg={6} display="flex" justifyContent={"center"}>
            <MealCard meal={meal} key={i} onDelete={handleDeleteTray} />
          </Grid>
        ))}

        {addToggle && (
          <Dialog
            open={addToggle}
            onClose={() => {
              setAddToggle(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box
              sx={{ p: 1, py: 1.5, justifyContent: "center" }}
              justifyContent={"center"}
              display={"flex"}
              flexDirection={"column"}>
              <DialogTitle id="alert-dialog-title">
                <DialogContentText
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  id="alert-dialog-description">
                  {"Add new dish"}
                </DialogContentText>
              </DialogTitle>
              <DialogContent>
                <DishAddForm
                  onCancel={() => {
                    setAddToggle(false);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    setAddToggle(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    //TODO : delete dish
                    setDeleteConfirmation(false);
                  }}>
                  Save
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}
        {deleteConfirmation && (
          <Dialog
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
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
                  onClick={() => {
                    //TODO : delete dish
                    console.log("TODO Delete with delete id", deleteId);

                    setDeleteConfirmation(false);
                  }}>
                  Delete
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}
      </Grid>
    </Box>
  );
};

export default KitchenProfileMeal;
