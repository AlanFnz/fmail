import { connect } from 'react-redux'
import Header from './Header'
import { QueryWasMade } from '../../actions/inboxActions'

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: () => {
      dispatch(QueryWasMade(true));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
