import { userConstants } from '../Constants';
import { authenticationService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        authenticationService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    authenticationService.logout();
    return { type: userConstants.LOGOUT };
}