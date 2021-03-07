import { connect } from 'react-redux';
import { ShowAlert } from '../../actions/alertActions';
import { SetEmails } from '../../actions/inboxActions';
import fetchEmails from '../../utils/fetchEmails';
import timestampSort from '../inbox/utils/timestampSort';
import InboxEmail from '../inbox/utils/InboxEmail';
import paths from '../../config/paths';
import NavigationBar from './NavigationBar';

const fetchEmailsWithFetch = fetchEmails(window.fetch);

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    onEmailSent: async pathname => {
      const title = 'Email sent';
      const text = 'Email was sent successfully';
      dispatch(ShowAlert(title, text));

      if (paths.sentMail === pathname) {
        try {
          const response = await fetchEmailsWithFetch(pathname);
          const json = await response.json();
          const sort = json.sort(timestampSort);
          const emails = sort.map(InboxEmail);
          return dispatch(SetEmails(emails));
        } catch (error) {
          const title = 'Error';
          const text = error.message;
          return dispatch(ShowAlert(title, text));
        }
      }
    },
    onError: errorMessage => {
      const title = 'Email failed';
      return dispatch(ShowAlert(title, errorMessage));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);