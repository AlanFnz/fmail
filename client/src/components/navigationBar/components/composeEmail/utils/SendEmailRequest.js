import { RecipientsStringToRecipientsArray } from './RecipientsStringToRecipientsArray';

const SendEmailRequest = (recipientsString, subject, message) => {
  const recipients = RecipientsStringToRecipientsArray(recipientsString);
  const data = {
    recipients,
    subject,
    message
  };

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return request;
}

export default SendEmailRequest;
