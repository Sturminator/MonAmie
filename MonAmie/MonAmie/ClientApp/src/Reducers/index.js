import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { alert } from './alerts';

const rootReducer = combineReducers({
    authentication,
    alert
});

export default rootReducer;