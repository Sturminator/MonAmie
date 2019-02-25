import { authHeader } from '../Helpers';

export const userService = {
    getAll,
    getAllForUser,
    addToCurrentUsers,
    removeFromCurrentUsers,
    getById,
    logout
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/User/GetAll`, requestOptions).then(handleResponse);
}

function getAllForUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/User/GetAllForUser/` + id, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/User/Get/` + id, requestOptions).then(handleResponse);
}

function addToCurrentUsers(id) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };

    return fetch(`api/User/AddToCurrentUserList/` + id, requestOptions).then(handleResponse);
}

function removeFromCurrentUsers(id, currentUsers) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUsers)
    };

    return fetch(`api/User/RemoveFromCurrentUserList/` + id, requestOptions).then(handleResponse);
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