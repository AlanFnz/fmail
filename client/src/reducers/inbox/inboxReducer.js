import { SET_EMAILS, SET_LAST_EMAIL_OFFSET, SET_TOTAL_NUMBER_OF_EMAILS } from "../../types/inboxTypes";

const initState = {
  emails: [],
  totalNumberOfEmails: 0,
  emailOffset: 0
};

const inboxReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LAST_EMAIL_OFFSET:
      return {
        ...state,
        emailOffset: action.payload
      };

    case SET_TOTAL_NUMBER_OF_EMAILS:
      return {
        ...state,
        totalNumberOfEmails: action.payload
      };

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
