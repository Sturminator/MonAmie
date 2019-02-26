import { imagesConstants, authConstants } from '../Constants';
import { imagesService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const imagesActions = {
    index,
    viewImage,
    uploadImage,
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
                imageItem => dispatch(success(imageItem)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: imagesConstants.VIEWIMAGE_REQUEST, id } }
    function success(imageItem) { return { type: imagesConstants.VIEWIMAGE_SUCCESS, imageItem } }
    function failure(id, error) { return { type: imagesConstants.VIEWIMAGE_FAILURE, id, error } }
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

function logout()
{
    authService.logout();
    return { type: authConstants.LOGOUT };
}