import { SHOW_ALERT, CLOSE_ALERT } from "../../types/alertTypes";

const initState = {
  open: false,
  title: "",
  text: "",
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
      };

    case SHOW_ALERT:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;

  };
};

export default alertReducer;
