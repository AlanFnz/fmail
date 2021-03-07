import { connect } from "react-redux";
import { CloseAlert } from "../../actions/alertActions";
import Alert from "./Alert";

const mapStateToProps = (state) => {
  return {
    open: state.alert.open,
    title: state.alert.title,
    text: state.alert.text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      return dispatch(CloseAlert());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
