import { friendConstants, authConstants } from '../Constants';
import { friendService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const friendActions = {
    getAllFriends,
    getAllRequests,
    addFriend,
    removeFriend,
    acceptRequest,
    denyRequest,
    cancelRequest,
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

function addFriend() {

}

function removeFriend() {

}

function acceptRequest() {

}

function denyRequest() {

}

function cancelRequest() {

}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}