import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alerts.reducer';
import { categories } from './categories.reducer';
import { userProfile } from './userProfile.reducer';
import { users } from './user.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    categories,
    userProfile,
    users
});

export default rootReducer;