import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'


interface AddCustomerModalProps {
  isOpen: boolean;
  handleClose: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void
}

const AddCustomerModal = (props : AddCustomerModalProps) => {
  const {handleClose, isOpen} = props;
  return (
    <Modal open={isOpen} onClose={handleClose} components={(
      <>
        <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
          </Box>
      </>
    )}/>
  )
}

export default AddCustomerModal