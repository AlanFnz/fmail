import { SHOW_ALERT, CLOSE_ALERT } from "../types/alertTypes";

export const ShowAlert = (title, text) => {
  return {
    type: SHOW_ALERT,
    payload: {
      open: true,
      title,
      text,
    },
  };
};


export const CloseAlert = () => {
    return {
        type: CLOSE_ALERT
    };
};
