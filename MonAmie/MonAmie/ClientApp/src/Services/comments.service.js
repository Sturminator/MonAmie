import { authHeader } from '../Helpers';

export const commentsService = {
    getAllForGroup,
    addGroupComment,
    updateGroupComment,
    deleteGroupComment,
    logout
}

function getAllForGroup(groupId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`api/Comment/GetAllForGroup/` + groupId, requestOptions).then(handleResponse);
}

function addGroupComment(groupId, groupComment, currentComments) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: groupComment, currentComments: currentComments })
    };

    return fetch(`api/Comment/AddGroupComment/` + groupId, requestOptions).then(handleResponse);
}

function updateGroupComment(groupCommentId, groupComment, currentComments) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupComment: groupComment, currentComments: currentComments })
    };

    return fetch(`api/Comment/UpdateGroupComment/` + groupCommentId, requestOptions).then(handleResponse);
}

function deleteGroupComment(groupCommentId, currentComments) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentComments)
    };

    return fetch(`api/Comment/DeleteGroupComment/` + groupCommentId, requestOptions).then(handleResponse);
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