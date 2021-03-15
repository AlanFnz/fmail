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
  }

  render() {
    return (
      <Dialog
        fullWidth
        scroll="paper"
        open={this.props.open}
        onClose={() =>
          this.props.onCancel(
            this.props.originalForm,
            this.props.form,
            this.props.pathname
          )}
      >
        <DialogTitle>Compose email</DialogTitle>
        <form
          onSubmit={event =>
            this.props.onSend(
              event,
              this.props.pathname,
              this.props.form.emailId
            )}
        >
          <DialogContent>
            <TextField
              required
              name="recipients"
              className="compose-email__text-field"
              label="Recipients"
              onChange={this.props.onRecipientsChange}
              value={this.props.form.recipients}
            />
            <TextField
              required
              name="subject"
              className="compose-email__text-field"
              label="Subject"
              onChange={this.props.onSubjectChange}
              value={this.props.form.subject}
            />
            <TextField
              required
              name="message"
              className="compose-email__text-field--message"
              rows="6"
              fullWidth
              multiline
              label="Message"
              onChange={this.props.onMessageChange}
              value={this.props.form.message}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() =>
                this.props.onCancel(
                  this.props.originalForm,
                  this.props.form,
                  this.props.pathname
                )}
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
