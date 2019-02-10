import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alerts';
import { categories } from './category';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    categories
});

export default rootReducer;