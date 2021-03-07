import alertReducer from './alert/alertReducer';
import inboxReducer from './inbox/inboxReducer';
import navigationListReducer from './navigationList/navigationListReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    alert: alertReducer,
    inbox: inboxReducer,
    navigationList: navigationListReducer
});
