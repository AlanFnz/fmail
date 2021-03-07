import { SET_EMAILS } from "../types/inboxTypes";

export const SetEmails = emails => {
  return {
    type: SET_EMAILS,
    payload: emails
  };
};
