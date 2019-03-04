import { groupConstants, authConstants } from '../Constants';
import { groupService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const groupActions = {
    getAll,
    getAllForCategory,
    addGroup,
    updateGroup,
    deleteGroup,
    logout
}

function getAll() {
    return dispatch => {
        dispatch(request());

        groupService.getAll()
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: groupConstants.GETALL_REQUEST } }
    function success(groups) { return { type: groupConstants.GETALL_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALL_FAILURE, error } }
}

function getAllForCategory(categoryId) {
    return dispatch => {
        dispatch(request(categoryId));

        groupService.getAllForCategory(categoryId)
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error))
            );
    };

    function request(categoryId) { return { type: groupConstants.GETALLFORCATEGORY_REQUEST, categoryId } }
    function success(groups) { return { type: groupConstants.GETALLFORCATEGORY_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALLFORCATEGORY_FAILURE, error } }
}

function addGroup(ownerId, group) {
    return dispatch => {
        dispatch(request(ownerId, group));

        groupService.addGroup(ownerId, group)
            .then(
                group => dispatch(success()),
                error => dispatch(failure(error))
            );
    };

    function request(group) { return { type: groupConstants.ADDGROUP_REQUEST, ownerId, group } }
    function success(group) { return { type: groupConstants.ADDGROUP_SUCCESS, group } }
    function failure(error) { return { type: groupConstants.ADDGROUP_FAILURE, error } }
}

function updateGroup(group) {

}

function deleteGroup(groupId) {

}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}