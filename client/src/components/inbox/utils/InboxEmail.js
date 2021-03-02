const formatTimestamp = require('../../../utils/formatTimestamp');

const InboxEmail = incomingEmail => {
  const id = incomingEmail.id || '';
  const subject = incomingEmail.subject || '';
  const body = incomingEmail.body || '';
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
    id,
    subject,
    isImportant,
    body,
    viewedAt,
    timestamp: maybeTimestamp
  };
};

module.exports = InboxEmail;
