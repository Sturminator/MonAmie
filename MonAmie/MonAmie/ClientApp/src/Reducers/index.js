import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alerts.reducer';
import { categories } from './categories.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    categories
});

export default rootReducer;