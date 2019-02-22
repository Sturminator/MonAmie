import { authHeader } from '../Helpers';

export const friendService = {
    getAllFriends,
    getAllRequests,
    addFriend,
    removeFriend,
    acceptRequest,
    denyRequest,
    cancelRequest,
    logout
}

function getAllFriends(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Friend/GetAllFriends/` + id, requestOptions).then(handleResponse);
}

function getAllRequests(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Friend/GetAllFriendRequests/` + id, requestOptions).then(handleResponse);
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
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}