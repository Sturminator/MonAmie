import { imagesConstants, authConstants } from '../Constants';
import { imagesService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const imagesActions = {
    index,
    viewImage,
    uploadImage,
    upload,
    logout
};

function index()
{
    return dispatch =>
    {
        dispatch(request());

        imagesService.index()
            .then(
                userImageIds => dispatch(success(userImageIds)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: imagesConstants.INDEX_REQUEST } }
    function success(userImageIds) { return { type: imagesConstants.INDEX_SUCCESS, userImageIds } }
    function failure(error) { return { type: imagesConstants.INDEX_FAILURE, error } }
}

function viewImage(id)
{
    return dispatch =>
    {
        dispatch(request(id));

        imagesService.viewImage(id)
            .then(
            image => dispatch(success(image)),
            error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: imagesConstants.VIEWIMAGE_REQUEST, id } }
    function success(image) { return { type: imagesConstants.VIEWIMAGE_SUCCESS, image } }
    function failure(error) { return { type: imagesConstants.VIEWIMAGE_FAILURE, error } }
}

function uploadImage(files, id)
{
    return dispatch =>
    {
        dispatch(request(files, id));

        imagesService.uploadImage(files, id)
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: imagesConstants.UPLOADIMAGE_REQUEST, files, id } }
    function success(requests) { return { type: imagesConstants.UPLOADIMAGE_SUCCESS, requests } }
    function failure(error) { return { type: imagesConstants.UPLOADIMAGE_FAILURE, error } }
}

function upload(form) {
    return dispatch => {
        dispatch(request(form));

        imagesService.upload(form)
            .then(
                form => dispatch(success(form)),
                error => dispatch(failure(error))
            );
    };

    function request(form) { return { type: imagesConstants.UPLOAD_REQUEST, form } }
    function success(form) { return { type: imagesConstants.UPLOAD_SUCCESS, form } }
    function failure(error) { return { type: imagesConstants.UPLOAD_FAILURE, error } }
}

function logout()
{
    authService.logout();
    return { type: authConstants.LOGOUT };
}