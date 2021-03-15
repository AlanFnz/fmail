import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InboxRowIcons from '../inboxRowIcons/InboxRowIcons';
import InboxRowLink from './InboxRowLink';

class InboxRow extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = (event) => {
    if (this.props.email.type === "draft") {
      event.preventDefault();
      this.props.onDraftClick(this.props.email);
    }
  }
  
  emailSnippet = `${this.props.email.body.substring(0, 50)}...`;

  render() {
    const className = this.props.email.viewedAt
      ? "inbox__table-row--viewed"
      : "inbox__table-row";

    return (
      <TableRow className={className}>
        <TableCell className="inbox__table-cell">
          <InboxRowIcons
            isImportant={this.props.email.isImportant}
            emailId={this.props.email.id}
          />
        </TableCell>
        <TableCell className="inbox__table-cell--bold">
          <InboxRowLink
            content={this.props.email.subject}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
        <TableCell className="inbox__table-cell">
          <InboxRowLink
            content={this.emailSnippet}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
        <TableCell className="inbox__table-cell--bold">
          <InboxRowLink
            content={this.props.email.timestamp}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default InboxRow;
