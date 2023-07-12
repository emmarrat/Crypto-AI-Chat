import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ChatModal.css';

interface Props {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ChatModal: React.FC<Props> = ({ open, handleClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      transitionDuration={{ exit: 0.2 }}
    >
      <DialogTitle>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ChatModal;
