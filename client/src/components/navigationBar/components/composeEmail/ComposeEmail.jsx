import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ComposeEmail = ({ open, onCancel, onSend }) => {
  return (
    <Dialog fullWidth scroll="paper" open={open} onClose={onCancel}>
      <DialogTitle>Compose email</DialogTitle>
      <form onSubmit={onSend}>
        <DialogContent>
          <TextField
            required
            name="recipients"
            className="compose-email__text-field"
            label="Recipients"
        />
          <TextField
            required
            name="subject"
            className="compose-email__text-field"
            label="Subject"
        />
          <TextField
            required
            name="message"
            className="compose-email__text-field--message"
            rows="6"
            fullWidth
            multiline
            label="Message"
        />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ComposeEmail;
