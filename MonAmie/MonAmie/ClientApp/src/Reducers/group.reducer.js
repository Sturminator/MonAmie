import { groupConstants } from '../Constants';
import { authConstants } from '../Constants';

export function groups(state = {}, action) {
    switch (action.type) {
        case groupConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case groupConstants.GETALL_SUCCESS:
            return {
                loading: false,
                groups: action.groups
            };
        case groupConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case groupConstants.GETALLFORCATEGORY_REQUEST:
            return {
                loading: true,
                categoryId: action.categoryId
            };
        case groupConstants.GETALLFORCATEGORY_SUCCESS:
            return {
                loading: false,
                groups: action.groups
            };
        case groupConstants.GETALLFORCATEGORY_FAILURE:
            return {
                loading: false,
                error: action.error
            };        
        case groupConstants.ADDGROUP_REQUEST:
            return {
                loading: true,
                ownerId: action.ownerId,
                group: action.group
            };
        case groupConstants.ADDGROUP_SUCCESS:
            return {
                loading: false
            };
        case groupConstants.ADDGROUP_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case groupConstants.UPDATEGROUP_REQUEST:
            break;
        case groupConstants.UPDATEGROUP_SUCCESS:
            break;
        case groupConstants.UPDATEGROUP_FAILURE:
            break;
        case groupConstants.DELETEGROUP_REQUEST:
            break;
        case groupConstants.DELETEGROUP_SUCCESS:
            break;
        case groupConstants.DELETEGROUP_FAILURE:
            break;
        case authConstants.LOGOUT:
            return {}
        default:
            return state; 
    }
}

export function group(state = {}, action) {
    switch (action.type) {
        case groupConstants.GETGROUP_REQUEST:
            return {
                loading: true,
                groupId: action.groupId
            };
        case groupConstants.GETGROUP_SUCCESS:
            return {
                loading: false,
                group: action.group
            };
        case groupConstants.GETGROUP_FAILURE:
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

export function userGroups(state = {}, action) {
    switch (action.type) {
        case groupConstants.GETALLFORUSER_REQUEST:
            return {
                loading: true,
                userId: action.userId
            };
        case groupConstants.GETALLFORUSER_SUCCESS:
            return {
                loading: false,
                groups: action.groups
            };
        case groupConstants.GETALLFORUSER_FAILURE:
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