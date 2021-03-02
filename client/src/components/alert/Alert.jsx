
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const Alert = ({ open, onClose, title, text }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose} data-test="alert">
      <DialogTitle data-test="alert__title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText data-test="alert__text">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          color="primary"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;