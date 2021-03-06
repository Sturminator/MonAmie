﻿import { authHeader } from '../Helpers';

export const userProfileService = {
    getById,
    update,
    updateCategories,
    logout
};

function getById(id, loggedInId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/UserProfile/GetById/` + id + `/` + loggedInId, requestOptions).then(handleResponse);
}

function update(userProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile.items)
    };

    return fetch(`api/UserProfile/Update`, requestOptions).then(handleResponse);
}

function updateCategories(userProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile.items)
    };

    return fetch(`api/UserProfile/UpdateCategories`, requestOptions).then(handleResponse);
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