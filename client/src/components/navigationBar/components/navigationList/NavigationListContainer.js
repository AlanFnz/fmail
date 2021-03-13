import { connect } from 'react-redux';
import NavigationList from './NavigationList';

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname,
    emailOverview: state.navigationList.emailOverview
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);