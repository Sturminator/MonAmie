import { authHeader } from '../Helpers';

export const groupService = {
    getAll,
    getAllForCategory,
    getAllForUser,
    addGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    addUserToGroup,
    removeUserFromGroup,
    getHomePageGroups,
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

function addGroup(ownerId, group, userGroups) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: group.groupName, description: group.description, categoryId: group.categoryId, state: group.state, userGroups: userGroups })
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

function deleteGroup(groupId, group) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group.group)
    };

    return fetch(`api/Group/DeleteGroup/` + groupId, requestOptions).then(handleResponse);
}

function addUserToGroup(userId, group) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group.group)
    };

    return fetch(`api/Group/AddUserToGroup/` + userId, requestOptions).then(handleResponse);
}

function removeUserFromGroup(userId, group) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group.group)
    };

    return fetch(`api/Group/RemoveUserFromGroup/` + userId, requestOptions).then(handleResponse);
}

function getGroup(groupId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetGroup/` + groupId, requestOptions).then(handleResponse);
}

function getHomePageGroups(userId, state) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Group/GetHomePageGroups/` + userId + `/` + state, requestOptions).then(handleResponse);
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