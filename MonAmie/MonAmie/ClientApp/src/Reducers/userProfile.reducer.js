import { userProfileConstants } from '../Constants';

export function userProfile(state = {}, action) {
    switch (action.type) {
        case userProfileConstants.GETBYID_REQUEST:
            break;
        case userProfileConstants.GETBYID_SUCCESS:
            break;
        case userProfileConstants.GETBYID_FAILURE:
            break;
        case userProfileConstants.UPDATE_REQUEST:
            break;
        case userProfileConstants.UPDATE_SUCCESS:
            break;
        case userProfileConstants.UPDATE_FAILURE:
            break;
        default:
            return state;
    }
}