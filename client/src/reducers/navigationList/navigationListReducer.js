import { SET_LOCATION, SET_EMAIL_OVERVIEW } from '../../types/navigationListTypes';

const initState = {
  pathname: window.location.pathname,
  emailOverview: {}
};

const navigationListReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        pathname: action.payload
      };
    case SET_EMAIL_OVERVIEW:
      return {
        ...state,
        emailOverview: action.payload
      };
    default:
      return state;
  }
};

export default navigationListReducer;