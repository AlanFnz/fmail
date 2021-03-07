import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => {
    return {
        showAlert: state.alert.open,
        alertTitle: state.alert.title,
        alertText: state.alert.text
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
