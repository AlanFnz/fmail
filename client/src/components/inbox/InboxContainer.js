import { connect } from 'react-redux';
import fetchAbsolute from 'fetch-absolute';
import fetchEmails from '../../utils/fetchEmails';
import paths from '../../config/paths';
import { ShowAlert } from '../../actions/alertActions';
import timestampSort from './utils/timestampSort';
import InboxEmail from './utils/InboxEmail';
import EmailOverview from '../navigationBar/components/navigationList/EmailOverview';
import pathnameToEmailType from './utils/pathnameToEmailType';
import { EMAIL_LIMIT } from './config';
import { SetEmailOverview } from '../../actions/navigationListActions';
import { SetLocation } from'../../actions/navigationListActions';
import { SetEmails, SetTotalNumberOfEmails, SetLastEmailOffset } from'../../actions/inboxActions';
import Inbox from './Inbox';

const fetchEmailsWithFetch = fetchEmails(window.fetch);
const fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname,
    emails: state.inbox.emails,
    emailOffset: state.inbox.emailOffset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: async (lastPathname, pathname, emailOffset) => {
      dispatch(SetLocation(pathname));
      try {
        // TODO: Optimization (too many requests)
        let offset;
        if (lastPathname === pathname) {
          offset = emailOffset;
          dispatch(SetLastEmailOffset(offset));
        } else {
          offset = 0;
          dispatch(SetLastEmailOffset(offset));
        }
        const promise = fetchEmailsWithFetch(pathname, offset, EMAIL_LIMIT);
        const promise2 = fetchApi(paths.api.overview);
        const emailType = pathnameToEmailType(pathname);
        const promise3 = fetchApi(paths.api.emailCount(emailType));
        const [response, response2, response3] = await Promise.all([
          promise,
          promise2,
          promise3
        ]);
        const json = await response.json();
        const json2 = await response2.json();
        const json3 = await response3.json();
        const totalEmails = json3.count;
        dispatch(SetTotalNumberOfEmails(totalEmails));
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