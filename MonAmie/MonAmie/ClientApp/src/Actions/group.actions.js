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

}

function getAllForCategory(categoryId) {

}

function addGroup(group) {
    return dispatch => {
        dispatch(request(group));

        groupService.addGroup(group)
            .then(
                group => dispatch(success()),
                error => dispatch(failure(error))
            );
    };

    function request(group) { return { type: groupConstants.ADDGROUP_REQUEST, group } }
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