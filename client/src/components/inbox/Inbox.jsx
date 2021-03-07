import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import InboxRow from './components/inboxRow/InboxRow';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  };

  async componentDidMount() {
    this.props.fetchEmails(window.location.pathname);
  };

  render() {
    return (
      <Table>
        <TableBody>
          {this.props.emails.map(email => (
            <InboxRow key={email.id} email={email} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Inbox;