import { friendConstants, authConstants } from '../Constants';
import { friendService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';
import { friends } from '../Reducers/friend.reducer';

export const friendActions = {
    getAllFriends,
    getAllRequests,
    addFriend,
    removeFriend,
    acceptRequest,
    denyRequest,
    cancelRequest,
    addToCurrentFriends,
    logout
};

function getAllFriends(id) {
    return dispatch => {
        dispatch(request(id));

        friendService.getAllFriends(id)
            .then(
                friends => dispatch(success(friends)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.GETALLFRIENDS_REQUEST, id } }
    function success(friends) { return { type: friendConstants.GETALLFRIENDS_SUCCESS, friends } }
    function failure(error) { return { type: friendConstants.GETALLFRIENDS_FAILURE, error } }
}

function getAllRequests(id) {
    return dispatch => {
        dispatch(request(id));

        friendService.getAllRequests(id)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.GETALLREQUESTS_REQUEST, id } }
    function success(requests) { return { type: friendConstants.GETALLREQUESTS_SUCCESS, requests } }
    function failure(error) { return { type: friendConstants.GETALLREQUESTS_FAILURE, error } }
}

function addFriend(id, pendingId, currentRequests) {
    return dispatch => {
        dispatch(request(id, pendingId));

        friendService.addFriend(id, pendingId, currentRequests)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.ADDFRIEND_REQUEST, id, pendingId } }
    function success(requests) { return { type: friendConstants.ADDFRIEND_SUCCESS, requests } }
    function failure(error) { return { type: friendConstants.ADDFRIEND_FAILURE, error } }
}

function removeFriend(id, friendId, currentFriends) {
    return dispatch => {
        dispatch(request(id, friendId));

        friendService.removeFriend(id, friendId, currentFriends)
            .then(
                friends => dispatch(success(friends)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.REMOVEFRIEND_REQUEST, id, friendId } }
    function success(friends) { return { type: friendConstants.REMOVEFRIEND_SUCCESS, friends } }
    function failure(error) { return { type: friendConstants.REMOVEFRIEND_FAILURE, error } }
}

function acceptRequest(id, pendingId, currentRequests) {
    return dispatch => {
        dispatch(request(id, pendingId));
        dispatch(secondRequest(id));

        friendService.acceptRequest(id, pendingId, currentRequests)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.ACCEPTREQUEST_REQUEST, id, pendingId } }
    function secondRequest(id) { return { type: friendConstants.GETALLREQUESTS_REQUEST, id } }
    function success(requests) { return { type: friendConstants.ACCEPTREQUEST_SUCCESS, requests } }
    function failure(error) { return { type: friendConstants.ACCEPTREQUEST_FAILURE, error } }
}

function denyRequest(id, pendingId, currentRequests) {
    return dispatch => {
        dispatch(request(id, pendingId));

        friendService.denyRequest(id, pendingId, currentRequests)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.DENYREQUEST_REQUEST, id, pendingId } }
    function success(requests) { return { type: friendConstants.DENYREQUEST_SUCCESS, requests } }
    function failure(error) { return { type: friendConstants.DENYREQUEST_FAILURE, error } }
}

function cancelRequest(id, pendingId, currentRequests) {
    return dispatch => {
        dispatch(request(id, pendingId));

        friendService.cancelRequest(id, pendingId, currentRequests)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: friendConstants.CANCELREQUEST_REQUEST, id, pendingId } }
    function success(requests) { return { type: friendConstants.CANCELREQUEST_SUCCESS, requests } }
    function failure(error) { return { type: friendConstants.CANCELREQUEST_FAILURE, error } }
}

function addToCurrentFriends(id, currentFriends) {
    return dispatch => {
        dispatch(request(id));

        friendService.addToCurrentFriends(id, currentFriends)
            .then(
                friends => dispatch(success(friends)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: friendConstants.ADDTOCURRENTFRIENDS_REQUEST, id } }
    function success(friends) { return { type: friendConstants.ADDTOCURRENTFRIENDS_SUCCESS, friends } }
    function failure(error) { return { type: friendConstants.ADDTOCURRENTFRIENDS_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}