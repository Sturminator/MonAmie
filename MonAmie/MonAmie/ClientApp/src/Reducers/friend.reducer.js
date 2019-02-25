import { friendConstants } from '../Constants';
import { authConstants } from '../Constants';

export function friends(state = {}, action) {
    switch (action.type) {
        case friendConstants.GETALLFRIENDS_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case friendConstants.GETALLFRIENDS_SUCCESS:
            return {
                loading: false,
                items: action.friends
            };
        case friendConstants.GETALLFRIENDS_FAILURE:
            return {
                loading: false,
                error: action.error
            };                        
        case friendConstants.REMOVEFRIEND_REQUEST:
            return {
                loading: true,
                id: action.id,
                friendId: action.friendId
            };
        case friendConstants.REMOVEFRIEND_SUCCESS:
            return {
                loading: false,
                items: action.friends
            };
        case friendConstants.REMOVEFRIEND_FAILURE:
            return {
                loading: false,
                error: action.error
            };   
        case authConstants.LOGOUT:
            return {}
        default:
            return state;
    }
}

export function requests(state = {}, action) {
    switch (action.type) {
        case friendConstants.GETALLREQUESTS_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case friendConstants.GETALLREQUESTS_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case friendConstants.GETALLREQUESTS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case friendConstants.ADDFRIEND_REQUEST:
            return {
                loading: true,
                id: action.id,
                pendingId: action.pendingId
            };
        case friendConstants.ADDFRIEND_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case friendConstants.ADDFRIEND_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case friendConstants.CANCELREQUEST_REQUEST:
            return {
                loading: true,
                id: action.id,
                pendingId: action.pendingId
            };
        case friendConstants.CANCELREQUEST_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case friendConstants.CANCELREQUEST_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case friendConstants.DENYREQUEST_REQUEST:
            return {
                loading: true,
                id: action.id,
                pendingId: action.pendingId
            };
        case friendConstants.DENYREQUEST_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case friendConstants.DENYREQUEST_FAILURE:
            return {
                loading: false,
                error: action.error
            }; 
        case friendConstants.ACCEPTREQUEST_REQUEST:
            return {
                loading: true,
                id: action.id,
                friendId: action.pendingId
            };
        case friendConstants.ACCEPTREQUEST_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case friendConstants.ACCEPTREQUEST_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}