import { connect } from 'react-redux';
import { ShowComposeEmail } from '../../actions/composeEmailActions';
import NavigationBar from './NavigationBar';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onCompose() {
      dispatch(ShowComposeEmail(true));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);