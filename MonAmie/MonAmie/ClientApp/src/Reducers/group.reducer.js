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
        case groupConstants.DELETEGROUP_REQUEST:
            return {
                loading: true,
                ownerId: action.ownerId,
                group: action.group
            };
        case groupConstants.DELETEGROUP_SUCCESS:
            return {
                loading: false,
                group: action.group
            };
        case groupConstants.DELETEGROUP_FAILURE:
            return {
                loading: false,
                error: action.error
            };  
        case groupConstants.UPDATEGROUP_REQUEST:
            return {
                loading: true,
                groupId: action.groupId
            };
        case groupConstants.UPDATEGROUP_SUCCESS:
            return {
                loading: false,
                group: action.group
            };
        case groupConstants.UPDATEGROUP_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case groupConstants.ADDUSERTOGROUP_REQUEST:
            return {
                loading: true,
                userId: action.userId
            };
        case groupConstants.ADDUSERTOGROUP_SUCCESS:
            return {
                loading: false,
                group: action.group
            };
        case groupConstants.ADDUSERTOGROUP_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case groupConstants.REMOVEUSERFROMGROUP_REQUEST:
            return {
                loading: true,
                userId: action.userId
            };
        case groupConstants.REMOVEUSERFROMGROUP_SUCCESS:
            return {
                loading: false,
                group: action.group
            };
        case groupConstants.REMOVEUSERFROMGROUP_FAILURE:
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
        case groupConstants.ADDGROUP_REQUEST:
            return {
                loading: true,
                ownerId: action.ownerId
            };
        case groupConstants.ADDGROUP_SUCCESS:
            return {
                loading: false,
                groups: action.groups
            };
        case groupConstants.ADDGROUP_FAILURE:
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

export function homePageGroups(state = {}, action) {
    switch (action.type) {
        case groupConstants.GETHOMEPAGEGROUPS_REQUEST:
            return {
                loading: true,
                userId: action.userId
            };
        case groupConstants.GETHOMEPAGEGROUPS_SUCCESS:
            return {
                loading: false,
                groups: action.groups
            };
        case groupConstants.GETHOMEPAGEGROUPS_FAILURE:
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