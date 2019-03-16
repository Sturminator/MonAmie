import { commentConstants, authConstants } from '../Constants';
import { commentsService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const commentsActions = {
    getAllForGroup,
    addGroupComment,
    updateGroupComment,
    deleteGroupComment,
    logout
}

function getAllForGroup(groupId) {
    return dispatch => {
        dispatch(request(groupId));

        commentsService.getAllForGroup(groupId)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(groupId) { return { type: commentConstants.GETALLFORGROUP_REQUEST, groupId } }
    function success(comments) { return { type: commentConstants.GETALLFORGROUP_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.GETALLFORGROUP_FAILURE, error } }
}

function addGroupComment(groupId, groupComment, currentComments) {
    return dispatch => {
        dispatch(request(groupId));

        commentsService.addGroupComment(groupId, groupComment, currentComments)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(groupId) { return { type: commentConstants.ADDGROUPCOMMENT_REQUEST, groupId } }
    function success(comments) { return { type: commentConstants.ADDGROUPCOMMENT_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.ADDGROUPCOMMENT_FAILURE, error } }
}

function updateGroupComment(groupCommentId, groupComment, currentComments) {
    return dispatch => {
        dispatch(request(groupCommentId));

        commentsService.updateGroupComment(groupCommentId, groupComment, currentComments)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(groupCommentId) { return { type: commentConstants.UPDATEGROUPCOMMENT_REQUEST, groupCommentId } }
    function success(comments) { return { type: commentConstants.UPDATEGROUPCOMMENT_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.UPDATEGROUPCOMMENT_FAILURE, error } }
}

function deleteGroupComment(groupCommentId, currentComments) {
    return dispatch => {
        dispatch(request(groupCommentId));

        commentsService.deleteGroupComment(groupCommentId, currentComments)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(groupCommentId) { return { type: commentConstants.DELETEGROUPCOMMENT_REQUEST, groupCommentId } }
    function success(comments) { return { type: commentConstants.DELETEGROUPCOMMENT_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.DELETEGROUPCOMMENT_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}