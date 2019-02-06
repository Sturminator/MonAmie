import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alerts';
import { userInterests } from './userInterest';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    userInterests
});

export default rootReducer;