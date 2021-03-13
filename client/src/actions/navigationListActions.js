import { SET_LOCATION, SET_EMAIL_OVERVIEW } from '../types/navigationListTypes';

export const SetLocation = pathname => {
  return {
    type: SET_LOCATION,
    payload: pathname
  };
};

export const SetEmailOverview = overview => {
  return {
    type: SET_EMAIL_OVERVIEW,
    payload: overview
  };
};
