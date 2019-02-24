﻿import { authHeader } from '../Helpers';

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

function addFriend(id, pendingId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingId)
    };

    return fetch(`api/Friend/AddFriend/` + id, requestOptions).then(handleResponse);
}

function removeFriend(id, friendId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(friendId)
    };

    return fetch(`api/Friend/DeleteFriend/` + id, requestOptions).then(handleResponse);
}

function acceptRequest(id, pendingId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingId)
    };

    return fetch(`api/Friend/AcceptFriendRequest/` + id, requestOptions).then(handleResponse);
}

function denyRequest(id, pendingId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingId)
    };

    return fetch(`api/Friend/DenyFriendRequest/` + id, requestOptions).then(handleResponse);
}

function cancelRequest(id, pendingId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingId)
    };

    return fetch(`api/Friend/CancelFriendRequest/` + id, requestOptions).then(handleResponse);
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