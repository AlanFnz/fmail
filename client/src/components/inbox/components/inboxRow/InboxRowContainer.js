import { connect } from 'react-redux';
import ComposeForm from '../../../navigationBar/components/composeEmail/ComposeForm';
import { SetForm, ShowComposeEmail } from '../../../../actions/composeEmailActions';
import InboxRow from './InboxRow';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onDraftClick: email => {
      const form = ComposeForm(email);
      dispatch(SetForm(form));

      const show = true;
      dispatch(ShowComposeEmail(show));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxRow);