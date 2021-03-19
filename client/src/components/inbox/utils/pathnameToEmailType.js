import paths from '../../../config/paths';

export default pathname => {
  switch (pathname) {
    case paths.root:
    case paths.inbox:
      return "inbox";

    case paths.searchTemplate:
      return "search";

    case paths.important:
      return "important";

    case paths.sentMail:
      return "sent";

    case paths.drafts:
      return "drafts";

    case paths.spam:
      return "spam";

    default:
      throw new Error(`${pathname} is not a valid emailType`);
  }
};