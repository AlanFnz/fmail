import { connect } from 'react-redux';
import NavigationList from './NavigationList';

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);