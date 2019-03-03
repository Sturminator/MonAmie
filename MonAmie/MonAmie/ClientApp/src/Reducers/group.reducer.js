import { groupConstants } from '../Constants';
import { authConstants } from '../Constants';

export function groups(state = {}, action) {
    switch (action.type) {
        case groupConstants.GETALL_REQUEST:
            break;
        case groupConstants.GETALL_SUCCESS:
            break;
        case groupConstants.GETALL_FAILURE:
            break;
        case groupConstants.GETALLFORCATEGORY_REQUEST:
            break;
        case groupConstants.GETALLFORCATEGORY_SUCCESS:
            break;
        case groupConstants.GETALLFORCATEGORY_FAILURE:
            break;
        case groupConstants.ADDGROUP_REQUEST:
            break;
        case groupConstants.ADDGROUP_SUCCESS:
            break;
        case groupConstants.ADDGROUP_FAILURE:
            break;
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