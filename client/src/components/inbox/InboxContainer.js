import { connect } from 'react-redux';
import fetchAbsolute from 'fetch-absolute';
import fetchEmails from '../../utils/fetchEmails';
import paths from '../../config/paths';
import { ShowAlert } from '../../actions/alertActions';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';
import EmailOverview from '../navigationBar/components/navigationList/EmailOverview';
import { SetEmailOverview } from '../../actions/navigationListActions';
import { SetLocation } from'../../actions/navigationListActions';
import { SetEmails } from'../../actions/inboxActions';
import Inbox from './Inbox';


const fetchEmailsWithFetch = fetchEmails(window.fetch);
const fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

const mapStateToProps = state => {
  return {
    emails: state.inbox.emails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: async pathname => {
      dispatch(SetLocation(pathname));
      try {
        const responsePromise1 = fetchEmailsWithFetch(pathname);
        const responsePromise2 = fetchApi(paths.api.overview);
        const [response, response2] = await Promise.all([
          responsePromise1,
          responsePromise2
        ]);
        const json = await response.json();
        const json2 = await response2.json();
        const overview = EmailOverview(json2);
        dispatch(SetEmailOverview(overview));
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