﻿import { authHeader } from '../Helpers';

export const groupService = {
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