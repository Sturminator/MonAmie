import { authHeader } from '../Helpers';

export const groupService = {
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
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetAll`, requestOptions).then(handleResponse);
}

function getAllForCategory(categoryId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetAllForCategory/` + categoryId, requestOptions).then(handleResponse);
}

function getAllForUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetAllForUser/` + userId, requestOptions).then(handleResponse);
}

function addGroup(ownerId, group) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    };

    return fetch(`api/Group/AddGroup/` + ownerId, requestOptions).then(handleResponse);
}

function updateGroup(groupId, group) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group.group)
    };

    return fetch(`api/Group/UpdateGroup/` + groupId, requestOptions).then(handleResponse);
}

function deleteGroup() {

}

function getGroup(groupId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetGroup/` + groupId, requestOptions).then(handleResponse);
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