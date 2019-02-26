import { authHeader } from '../Helpers';

export const imagesService = {
    index,
    viewImage,
    uploadImage,
    logout
};

function index()
{
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/UserImage/Index`, requestOptions).then(handleResponse);
}

function viewImage(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/UserImage/ViewImage` + id, requestOptions).then(handleResponse);
}

function uploadImage(files, id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    };

    return fetch(`api/UserImage/UploadImage/` + files, requestOptions).then(handleResponse);
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