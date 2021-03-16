import paths from "../config/paths";
import fetchAbsolute from 'fetch-absolute';

const fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

export default () => (pathname, offset, limit) => {
  switch (pathname) {
    case paths.inbox:
      return fetchApi(paths.api.inboxEmails(offset, limit));

    case paths.root:
      return fetchApi(paths.api.inboxEmails(offset, limit));

    case paths.important:
      return fetchApi(paths.api.importantEmails(offset, limit));

    case paths.sentMail:
      return fetchApi(paths.api.sentMailEmails(offset, limit));

    case paths.drafts:
      return fetchApi(paths.api.draftsEmails(offset, limit));

    case paths.spam:
      return fetchApi(paths.api.spamEmails(offset, limit));

    default:
      throw new Error(`${pathname} is not a valid path`);
  }
};
