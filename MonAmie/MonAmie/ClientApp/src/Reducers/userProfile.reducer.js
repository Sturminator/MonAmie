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
            return {
                loading: true
            };
        case userProfileConstants.UPDATE_SUCCESS:
            return {
                loading: false,
                items: action.userProfile
            };
        case userProfileConstants.UPDATE_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case userProfileConstants.UPDATECATEGORIES_REQUEST:
            return {
                loading: true
            };
        case userProfileConstants.UPDATECATEGORIES_SUCCESS:
            return {
                loading: false,
                items: action.userProfile
            };
        case userProfileConstants.UPDATECATEGORIES_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}