import { SET_EMAILS, SET_LAST_EMAIL_OFFSET, SET_TOTAL_NUMBER_OF_EMAILS, QUERY_WAS_MADE } from "../../types/inboxTypes";

const initState = {
  emails: [],
  totalNumberOfEmails: 0,
  emailOffset: 0,
  queryWasMade: false,
};

const inboxReducer = (state = initState, action) => {
  switch (action.type) {
    case QUERY_WAS_MADE:
      return {
        ...state,
        queryWasMade: action.payload
      }
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
