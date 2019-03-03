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

function getAllForCategory() {

}

function addGroup() {

}

function updateGroup() {

}

function deleteGroup() {

}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}