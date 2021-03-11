import { connect } from 'react-redux';
import { ShowAlert } from '../../actions/alertActions';
import Email from './Email';

const mapStateToProps = (state, { match }) => {
  return {
    emailId: match.params.emailId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: error => {
      const title = "Error";
      const text = error.message;
      return dispatch(ShowAlert(title, text));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);