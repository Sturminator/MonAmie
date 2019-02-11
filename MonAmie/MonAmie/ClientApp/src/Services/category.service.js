import { authHeader } from '../Helpers';

export const categoryService = {
    getAllForUser,
    logout
};

function getAllForUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Category/GetAllForUser/` + id, requestOptions).then(handleResponse);
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