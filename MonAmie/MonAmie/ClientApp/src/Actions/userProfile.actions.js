import { userProfileConstants, authConstants } from '../Constants';
import { userProfileService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userProfileActions = {
    getById,
    update,
    updateCategories,
    logout
};

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        userProfileService.getById(id)
            .then(
                userProfile => dispatch(success(userProfile)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userProfileConstants.GETBYID_REQUEST, id } }
    function success(userProfile) { return { type: userProfileConstants.GETBYID_SUCCESS, userProfile } }
    function failure(error) { return { type: userProfileConstants.GETBYID_FAILURE, error } }
}

function update(userProfile) {
    return dispatch => {
        dispatch(request(userProfile));

        userProfileService.update(userProfile)
            .then(
                userProfile => dispatch(success(userProfile)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(userProfile) { return { type: userProfileConstants.UPDATE_REQUEST, userProfile } }
    function success(userProfile) { return { type: userProfileConstants.UPDATE_SUCCESS, userProfile } }
    function failure(error) { return { type: userProfileConstants.UPDATE_FAILURE, error } }
}

function updateCategories(userProfile) {
    return dispatch => {
        dispatch(request(userProfile));

        userProfileService.updateCategories(userProfile)
            .then(
            userProfile => dispatch(success(userProfile)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(userProfile) { return { type: userProfileConstants.UPDATECATEGORIES_REQUEST, userProfile } }
    function success(userProfile) { return { type: userProfileConstants.UPDATECATEGORIES_SUCCESS, userProfile } }
    function failure(error) { return { type: userProfileConstants.UPDATECATEGORIES_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}