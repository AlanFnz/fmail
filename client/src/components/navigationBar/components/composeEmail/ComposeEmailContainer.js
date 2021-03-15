import ComposeEmail from './ComposeEmail';
import { connect } from 'react-redux';
import fetchAbsolute from 'fetch-absolute';
import { ShowAlert } from '../../../../actions/alertActions';
import { SetEmails } from '../../../../actions/inboxActions';
import { ShowComposeEmail, ResetForm, SetFormField } from '../../../../actions/composeEmailActions';
import EmailOverview from '../navigationList/EmailOverview';
import { SetEmailOverview } from '../../../../actions/navigationListActions';
import fetchEmails from '../../../../utils/fetchEmails';
import timestampSort from '../../../inbox/utils/timestampSort';
import InboxEmail from '../../../inbox/utils/InboxEmail';
import paths from '../../../../config/paths';
import SendEmailRequest from './utils/SendEmailRequest';
import UpdateEmailRequest from './utils/UpdateEmailRequest';
import { RemoveEmailRequest } from './utils/RemoveEmailRequest';
import { EmailWasStarted } from './utils/EmailWasStarted';
import FormFieldsChanged from './utils/FormFieldChanged';

const fetchApi = fetchAbsolute(fetch)('http://localhost:5000');
const fetchEmailsWithFetch = fetchEmails(window.fetch);

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname,
    open: state.composeEmail.show,
    originalForm: state.composeEmail.originalForm,
    form: state.composeEmail.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRecipientsChange: event => {
      dispatch(SetFormField("recipients", event.target.value));
    },
    onSubjectChange: event => {
      dispatch(SetFormField("subject", event.target.value));
    },
    onMessageChange: event => {
      dispatch(SetFormField("message", event.target.value));
    },
    async onCancel(originalForm, form, pathname) {
      const recipients = form.recipients;
      const subject = form.subject;
      const message = form.message;
      const emailType = form.emailType;
      const emailId = form.emailId;
      dispatch(ShowComposeEmail(false));
      dispatch(ResetForm());
      try {
        if (emailType === "draft" && FormFieldsChanged(originalForm, form)) {
          const request = UpdateEmailRequest(recipients, subject, message);
          const response = await fetchApi(paths.api.draftEmail(emailId), request);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error);
          }

          this.onDraftSent(pathname);
        } else if (emailType !== "draft" && EmailWasStarted(form)) {
          const request = SendEmailRequest(recipients, subject, message);
          const response = await fetchApi(paths.api.draftsEmails, request);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.error);
          }

          this.onDraftSent(pathname);
        }
      } catch (error) {
        const title = "Draft save failed";
        this.onError(title, error.message);
      }
    },
    async onSend(event, pathname, maybeDraftEmailId) {
      event.preventDefault();
      const recipients = event.target.recipients.value;
      const subject = event.target.subject.value;
      const message = event.target.message.value;
      const request = SendEmailRequest(recipients, subject, message);
      try {
        const response = await fetchApi(paths.api.sendEmail, request);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error);
        } else {
          dispatch(ShowComposeEmail(false));
          dispatch(ResetForm());

          if (maybeDraftEmailId) {
            const request = RemoveEmailRequest();
            const response = await fetchApi(
              paths.api.email(maybeDraftEmailId),
              request
            );

            if (!response.ok) {
              const json = await response.json();
              throw new Error(json.error);
            }
          }

          this.onEmailSent(pathname);
        }
      } catch (error) {
        dispatch(ShowComposeEmail(false));
        dispatch(ResetForm());
        const title = "Email failed";
        this.onError(title, error.message);
      }
    },
    onError: (title, errorMessage) => {
      return dispatch(ShowAlert(title, errorMessage));
    },
    onEmailSent: async pathname => {
      const title = "Email sent";
      const text = "Email was sent successfully";
      dispatch(ShowAlert(title, text));

      try {
        const response = await fetchApi(paths.api.overview);
        const json = await response.json();
        dispatch(SetEmailOverview(EmailOverview(json)));

        if (paths.sentMail === pathname || paths.drafts === pathname) {
          const response = await fetchEmailsWithFetch(pathname);
          const json = await response.json();
          const sort = json.sort(timestampSort);
          const emails = sort.map(InboxEmail);
          return dispatch(SetEmails(emails));
        }
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    },
    onDraftSent: async pathname => {
      try {
        const response = await fetchApi(paths.api.overview);
        const json = await response.json();
        dispatch(SetEmailOverview(EmailOverview(json)));

        if (paths.drafts === pathname) {
          const response = await fetchEmailsWithFetch(pathname);
          const json = await response.json();
          const sort = json.sort(timestampSort);
          const emails = sort.map(InboxEmail);
          return dispatch(SetEmails(emails));
        }
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeEmail);
