import { SET_LOCATION } from '../../types/navigationListTypes';

const initState = {
  pathname: window.location.pathname
};

const navigationListReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        pathname: action.payload
      }
    default:
      return state;
  }
};

export default navigationListReducer;