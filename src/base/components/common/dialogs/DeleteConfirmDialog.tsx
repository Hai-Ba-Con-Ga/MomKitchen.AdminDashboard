import { BlockOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
    onConfirm : (e:MouseEvent)=> void;
    onCancel: ()=> void;
    deleteConfirmContent?: string;
    isOpen: boolean
}

const DeleteConfirmDialog = ({onConfirm, onCancel, deleteConfirmContent, isOpen}: Props) => {
  return (
    <Dialog
          open={isOpen}
          onClose={() => onCancel()}
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
             {deleteConfirmContent ?? "By deleting action, that user will not be able to use application no more."}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={(e)=>onConfirm(e)}>
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
  )
}

export default DeleteConfirmDialog