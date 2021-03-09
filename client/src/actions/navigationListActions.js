import { SET_LOCATION } from '../types/navigationListTypes';

export const SetLocation = pathname => {
  return {
    type: SET_LOCATION,
    payload: pathname
  };
};
