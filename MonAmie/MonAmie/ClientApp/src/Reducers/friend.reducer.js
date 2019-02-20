import { friendConstants } from '../Constants';

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
        case friendConstants.ADDFRIEND_REQUEST:
            break;
        case friendConstants.ADDFRIEND_SUCCESS:
            break;
        case friendConstants.ADDFRIEND_FAILURE:
            break;
        case friendConstants.REMOVEFRIEND_REQUEST:
            break;
        case friendConstants.REMOVEFRIEND_SUCCESS:
            break;
        case friendConstants.REMOVEFRIEND_FAILURE:
            break;
        case friendConstants.ACCEPTREQUEST_REQUEST:
            break;
        case friendConstants.ACCEPTREQUEST_SUCCESS:
            break;
        case friendConstants.ACCEPTREQUEST_FAILURE:
            break;
        case friendConstants.DENYREQUEST_REQUEST:
            break;
        case friendConstants.DENYREQUEST_SUCCESS:
            break;
        case friendConstants.DENYREQUEST_FAILURE:
            break;
        case friendConstants.CANCELREQUEST_REQUEST:
            break;
        case friendConstants.CANCELREQUEST_SUCCESS:
            break;
        case friendConstants.CANCELREQUEST_FAILURE:
            break;
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
        default:
            return state;
    }
}