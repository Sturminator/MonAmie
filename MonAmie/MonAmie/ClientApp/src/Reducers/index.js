import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alerts.reducer';
import { categories } from './categories.reducer';
import { userProfile } from './userProfile.reducer';
import { users } from './user.reducer';
import { friends, requests } from './friend.reducer';
import { images } from './images.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    categories,
    userProfile,
    users,
    friends,
    requests,
    images
});

export default rootReducer;