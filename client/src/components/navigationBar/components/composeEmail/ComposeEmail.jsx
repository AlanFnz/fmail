import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ComposeEmail extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  render() {
    return (
      <Dialog
        fullWidth
        scroll="paper"
        open={this.props.open}
        onClose={() => this.props.onCancel(this.formRef.current)}
      >
        <DialogTitle>Compose email</DialogTitle>
        <form onSubmit={this.props.onSend} ref={this.formRef}>
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
            <Button
              variant="contained"
              onClick={() => this.props.onCancel(this.formRef.current)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default ComposeEmail;
