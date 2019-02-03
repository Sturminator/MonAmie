import { authConstants } from '../Constants';
import { authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const authActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        authService.login(email, password)
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

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}