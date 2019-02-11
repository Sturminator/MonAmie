import { userProfileConstants } from '../Constants';

export function userProfile(state = {}, action) {
    switch (action.type) {
        case userProfileConstants.GETBYID_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case userProfileConstants.GETBYID_SUCCESS:
            return {
                items: action.userProfile
            };
        case userProfileConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
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