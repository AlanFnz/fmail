import paths from "../config/paths";
import fetchAbsolute from 'fetch-absolute';

const fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

export default () => pathname => {
  switch (pathname) {
    case paths.inbox:
      return fetchApi(paths.api.inboxEmails);

    case paths.root:
      return fetchApi(paths.api.inboxEmails);

    case paths.important:
      return fetchApi(paths.api.importantEmails);

    case paths.sentMail:
      return fetchApi(paths.api.sentMailEmails);

    case paths.drafts:
      return fetchApi(paths.api.draftsEmails);

    case paths.spam:
      return fetchApi(paths.api.spamEmails);

    default:
      throw new Error(`${pathname} is not a valid path`);
  }
};
