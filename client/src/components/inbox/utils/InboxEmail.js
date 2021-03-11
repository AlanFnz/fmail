import formatTimestamp from '../../../utils/formatTimestamp';

const InboxEmail = incomingEmail => {
  const _id = incomingEmail._id || '';
  const subject = incomingEmail.subject || '';
  const body = incomingEmail.message || '';
  const viewedAt = incomingEmail.viewedAt || '';
  const isImportant = incomingEmail.isImportant || false;
  let maybeTimestamp = incomingEmail.timestamp || '';

  try {
    maybeTimestamp = formatTimestamp(maybeTimestamp);
  } catch (error) {
    console.error(error.message);
    maybeTimestamp = '';
  }

  return {
    _id,
    subject,
    isImportant,
    body,
    viewedAt,
    timestamp: maybeTimestamp
  };
};

export default InboxEmail;
