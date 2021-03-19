import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import InboxRow from './components/inboxRow/InboxRowContainer';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillReceiveProps(nextprops) {
    if (!nextprops.queryWasMade) return;

    this.props.onSearch();
    const lastPathname = this.props.pathname;
    const currentPathname = window.location.pathname;
    this.props.fetchEmails(
      lastPathname,
      currentPathname,
      this.props.emailOffset,
      nextprops.q
    );
  }

  async componentDidMount() {
    const lastPathname = this.props.pathname;
    const currentPathname = window.location.pathname;
    this.props.fetchEmails(
      lastPathname,
      currentPathname,
      this.props.emailOffset,
      this.props.q,
    );
  };

  render() {
    return (
      <Table>
        <TableBody>
          {this.props.emails.map(email => (
            <InboxRow key={email._id} email={email} />
          ))}
        </TableBody>
      </Table>
    );
  };
};

export default Inbox;