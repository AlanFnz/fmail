import paths from "../config/paths";

export default fetch => pathname => {
  switch (pathname) {
    case paths.inbox:
      return fetch(paths.api.inboxEmails);

    case paths.important:
      return fetch(paths.api.importantEmails);

    case paths.sentMail:
      return fetch(paths.api.sentMailEmails);

    case paths.drafts:
      return fetch(paths.api.draftEmails);

    case paths.spam:
      return fetch(Paths.api.spamEmails);

    default:
      throw new Error(`${pathname} is not a valid path`);
  }
};
