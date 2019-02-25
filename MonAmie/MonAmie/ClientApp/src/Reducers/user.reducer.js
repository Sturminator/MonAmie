import { userConstants } from '../Constants';
import { authConstants } from '../Constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.GETALLFORUSER_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case userConstants.GETALLFORUSER_SUCCESS:
            return {
                loading: false,
                items: action.users
            };
        case userConstants.GETALLFORUSER_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case userConstants.GETBYID_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case userConstants.GETBYID_SUCCESS:
            return {
                items: action.user
            };
        case userConstants.GETBYID_FAILURE:
            return {
                id: action.id,
                error: action.error
            };
        case authConstants.LOGOUT:
            return {}
        default:
            return state;
    }
}