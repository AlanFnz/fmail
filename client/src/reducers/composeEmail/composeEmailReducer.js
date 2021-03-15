import {
  RESET_FORM,
  SET_FORM,
  SHOW,
  SET_FORM_FIELD,
} from "../../types/composeEmailTypes";

const initState = {
  originalForm: {
    recipients: "",
    subject: "",
    message: "",
  },
  form: {
    recipients: "",
    subject: "",
    message: "",
  },
  show: false,
};

const composeEmailReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FORM_FIELD:
      const newField = { [action.payload.key]: action.payload.value };
      const newForm = Object.assign({}, state.form, newField);
      // const newForm = { ...state.form, newField };
      return {
        ...state,
        form: newForm,
      };

    case SHOW:
      return {
        ...state,
        show: action.payload,
      };

    case SET_FORM:
      return {
        ...state,
        form: action.payload,
        originalForm: action.payload,
      };

    case RESET_FORM:
      return {
        ...state,
        form: initState.form,
        originalForm: initState.originalForm,
      };

    default:
      return state;
  }
};

export default composeEmailReducer;
