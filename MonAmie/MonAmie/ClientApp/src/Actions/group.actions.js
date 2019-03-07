import { groupConstants, authConstants } from '../Constants';
import { groupService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const groupActions = {
    getAll,
    getAllForCategory,
    getAllForUser,
    addGroup,
    updateGroup,
    deleteGroup,
    getGroup,
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

function getAllForUser(userId) {
    return dispatch => {
        dispatch(request(userId));

        groupService.getAllForUser(userId)
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error))
            );
    };

    function request(userId) { return { type: groupConstants.GETALLFORUSER_REQUEST, userId } }
    function success(groups) { return { type: groupConstants.GETALLFORUSER_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALLFORUSER_FAILURE, error } }
}

function addGroup(ownerId, group) {
    return dispatch => {
        dispatch(request(ownerId, group));

        groupService.addGroup(ownerId, group)
            .then(
                group => dispatch(success(group)),
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

function getGroup(groupId) {
    return dispatch => {
        dispatch(request(groupId));

        groupService.getGroup(groupId)
            .then(
                group => dispatch(success(group)),
                error => dispatch(failure(error))
            );
    };

    function request(groupId) { return { type: groupConstants.GETGROUP_REQUEST, groupId } }
    function success(group) { return { type: groupConstants.GETGROUP_SUCCESS, group } }
    function failure(error) { return { type: groupConstants.GETGROUP_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}