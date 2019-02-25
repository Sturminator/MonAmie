﻿import { userConstants, authConstants } from '../Constants';
import { userService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userActions = {
    getAll,
    getAllForUser,
    addToCurrentUsers,
    removeFromCurrentUsers,
    getById,
    logout
};

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllForUser(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getAllForUser(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userConstants.GETALLFORUSER_REQUEST, id } }
    function success(users) { return { type: userConstants.GETALLFORUSER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALLFORUSER_FAILURE, error } }
}

function addToCurrentUsers(id, toAddId, currentUsers) {
    return dispatch => {
        dispatch(request(id));

        userService.addToCurrentUsers(id, toAddId, currentUsers)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userConstants.ADDTOCURRENTUSERS_REQUEST, id } }
    function success(users) { return { type: userConstants.ADDTOCURRENTUSERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.ADDTOCURRENTUSERS_FAILURE, error } }
}

function removeFromCurrentUsers(id, currentUsers) {
    return dispatch => {
        dispatch(request(id));

        userService.removeFromCurrentUsers(id, currentUsers)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userConstants.REMOVEFROMCURRENTUSERS_REQUEST, id } }
    function success(users) { return { type: userConstants.REMOVEFROMCURRENTUSERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.REMOVEFROMCURRENTUSERS_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userConstants.GETBYID_REQUEST, id } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(id, error) { return { type: userConstants.GETBYID_FAILURE, id, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}