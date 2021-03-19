import { connect } from 'react-redux';
import Register from './Register';
import paths from '../../config/paths';
import RegisterRequest from './RegisterRequest';
import { ShowAlert } from '../../actions/alertActions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: async (event, history) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const confirmation = event.target.confirmation.value;

      if (password !== confirmation) {
        const title = "Invalid password";
        const message = "Password does not match confirmation";
        return dispatch(ShowAlert(title, message));
      }

      const registerRequest = RegisterRequest(email, password);

      try {
        const response = await fetch(paths.api.register, registerRequest);
        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.error);
        } else {
          history.push(paths.inbox);
        }
      } catch (error) {
        const title = "Error";
        return dispatch(ShowAlert(title, error.message));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
