import { connect } from 'react-redux';
import fetchEmails from '../../utils/fetchEmails';
import { ShowAlert } from '../../actions/alertActions';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';
import {
  SetLocation
} from'../../actions/navigationListActions';
import {
  SetEmails
} from'../../actions/inboxActions';
import Inbox from './Inbox';

const fetchEmailsWithFetch = fetchEmails(window.fetch);

const mapStateToProps = state => {
  return {
    emails: state.inbox.emails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: async pathname => {
      console.log(pathname);
      dispatch(SetLocation(pathname));
      try {
        const response = await fetchEmailsWithFetch(pathname);
        const json = await response.json();
        const sort = json.sort(timestampSort);
        const emails = sort.map(InboxEmail);
        return dispatch(SetEmails(emails));
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);