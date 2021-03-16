import UtilityBar from './UtilityBar';
import { EMAIL_LIMIT } from '../inbox/config';
import InboxEmail from '../inbox/utils/InboxEmail';
import { connect } from 'react-redux';
import fetchEmails from '../../utils/fetchEmails';
import { ShowAlert } from '../../actions/alertActions';
import { SetEmails, SetLastEmailOffset } from '../../actions/inboxActions';
import timestampSort from '../inbox/utils/timestampSort';

const fetchEmailsWithFetch = fetchEmails(window.fetch);

const mapStateToProps = (state) => {
  const rangeStart = state.inbox.emailOffset;
  return {
    pathname: state.navigationList.pathname,
    rangeStart,
    rangeEnd: Math.min(
      rangeStart + EMAIL_LIMIT,
      state.inbox.totalNumberOfEmails
    ),
    totalEmails: state.inbox.totalNumberOfEmails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPrevious: function (lastEmailOffset, pathname) {
      const nextOffset = Math.max(lastEmailOffset - EMAIL_LIMIT, 0);
      const nextEmailOffset = Math.max(nextOffset, 0);
      dispatch(SetLastEmailOffset(nextEmailOffset));
      this.fetchEmails(nextEmailOffset, pathname);
    },
    onNext: function (lastEmailOffset, totalEmails, pathname) {
      const nextEmailOffset = Math.min(
        Math.max(totalEmails - EMAIL_LIMIT, 0),
        lastEmailOffset + EMAIL_LIMIT
      );
      dispatch(SetLastEmailOffset(nextEmailOffset));
      this.fetchEmails(nextEmailOffset, pathname);
    },
    fetchEmails: async function (offset, pathname) {
      try {
        const response = await fetchEmailsWithFetch(
          pathname,
          offset,
          EMAIL_LIMIT
        );
        const json = await response.json();
        const sort = json.sort(timestampSort);
        const emails = sort.map(InboxEmail);
        return dispatch(SetEmails(emails));
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilityBar);
