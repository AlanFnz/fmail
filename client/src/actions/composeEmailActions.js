import {
  RESET_FORM,
  SET_FORM,
  SET_FORM_FIELD,
  SHOW,
} from '../types/composeEmailTypes.js';

export const SetFormField = (key, value) => {
  return {
    type: SET_FORM_FIELD,
    payload: {
      key,
      value,
    },
  };
};

export const SetForm = (form) => {
  return {
    type: SET_FORM,
    payload: form,
  };
};

export const ResetForm = () => {
  return {
    type: RESET_FORM,
  };
};

export const ShowComposeEmail = (show) => {
  return {
    type: SHOW,
    payload: show,
  };
};
