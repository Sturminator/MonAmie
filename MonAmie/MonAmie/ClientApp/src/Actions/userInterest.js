import { userInterestConstants, authConstants } from '../Constants';
import { userInterestService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userInterestActions = {
    getAll,
    logout
};

function getAll(id) {
    return dispatch => {
        dispatch(request(id));

        userInterestService.getAll(id)
            .then(
                userInterests => dispatch(success(userInterests)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: userInterestConstants.GETALL_REQUEST, id } }
    function success(id) { return { type: userInterestConstants.GETALL_SUCCESS, id } }
    function failure(id) { return { type: userInterestConstants.GETALL_FAILURE, id } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}
