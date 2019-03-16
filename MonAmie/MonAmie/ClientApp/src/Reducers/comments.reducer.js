import { commentConstants } from '../Constants';
import { authConstants } from '../Constants';

export function groupComments(state = {}, action) {
    switch (action.type) {
        case commentConstants.GETALLFORGROUP_REQUEST:
            return {
                loading: true,
                groupId: action.groupId
            };
        case commentConstants.GETALLFORGROUP_SUCCESS:
            return {
                loading: false,
                comments: action.comments
            };
        case commentConstants.GETALLFORGROUP_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case commentConstants.ADDGROUPCOMMENT_REQUEST:
            return {
                loading: true,
                groupId: action.groupId
            };
        case commentConstants.ADDGROUPCOMMENT_SUCCESS:
            return {
                loading: false,
                comments: action.comments
            };
        case commentConstants.ADDGROUPCOMMENT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case commentConstants.UPDATEGROUPCOMMENT_REQUEST:
            return {
                loading: true,
                groupCommentId: action.groupCommentId
            };
        case commentConstants.UPDATEGROUPCOMMENT_SUCCESS:
            return {
                loading: false,
                comments: action.comments
            };
        case commentConstants.UPDATEGROUPCOMMENT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case commentConstants.DELETEGROUPCOMMENT_REQUEST:
            return {
                loading: true,
                groupCommentId: action.groupCommentId
            };
        case commentConstants.DELETEGROUPCOMMENT_SUCCESS:
            return {
                loading: false,
                comments: action.comments
            };
        case commentConstants.DELETEGROUPCOMMENT_FAILURE:
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