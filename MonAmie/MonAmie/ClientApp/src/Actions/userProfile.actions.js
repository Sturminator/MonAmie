import { userProfileConstants, authConstants } from '../Constants';
import { userProfileService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userProfileActions = {
    getById,
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

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}