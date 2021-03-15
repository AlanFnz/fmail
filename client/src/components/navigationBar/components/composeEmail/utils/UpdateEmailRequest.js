import { RecipientsStringToRecipientsArray } from "./RecipientsStringToRecipientsArray";

const UpdateEmailRequest = (recipientsString, subject, message) => {
  const recipients = RecipientsStringToRecipientsArray(recipientsString);
  const data = {
    recipients,
    subject,
    message,
  };

  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return request;
};

export default UpdateEmailRequest;
