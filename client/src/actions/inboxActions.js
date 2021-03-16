import {
  SET_EMAILS,
  SET_LAST_EMAIL_OFFSET,
  SET_TOTAL_NUMBER_OF_EMAILS,
} from "../types/inboxTypes";

export const SetEmails = (emails) => {
  return {
    type: SET_EMAILS,
    payload: emails,
  };
};

export const SetTotalNumberOfEmails = (count) => {
  return {
    type: SET_TOTAL_NUMBER_OF_EMAILS,
    payload: count,
  };
};

export const SetLastEmailOffset = (number) => {
  return {
    type: SET_LAST_EMAIL_OFFSET,
    payload: number,
  };
};
