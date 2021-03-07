import { SET_EMAILS } from "../../types/inboxTypes";

const initState = {
  emails: [],
};

const inboxReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EMAILS:
      return {
        ...state,
        emails: action.payload,
      };

    default:
      return state;
  }
};

export default inboxReducer;
