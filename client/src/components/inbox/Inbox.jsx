import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import InboxRow from './components/inboxRow/InboxRow';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emails: [] };
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:5000/emails');
    const json = await response.json();
    const sortedEmails = json.sort(timestampSort);
    const emails = sortedEmails.map(incomingEmail => InboxEmail(incomingEmail));
    this.setState({ emails })
  };

  render() {
    return (
      <Table>
        <TableBody>
          {this.state.emails.map(email => (
            <InboxRow key={email.id} email={email} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Inbox;