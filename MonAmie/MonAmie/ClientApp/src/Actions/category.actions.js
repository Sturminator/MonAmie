import { categoryConstants, authConstants } from '../Constants';
import { categoryService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const categoryActions = {
    getAllForUser,
    logout
};

function getAllForUser(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.getAllForUser(id)
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.GETALLFORUSER_REQUEST, id } }
    function success(id) { return { type: categoryConstants.GETALLFORUSER_SUCCESS, id } }
    function failure(id) { return { type: categoryConstants.GETALLFORUSER_FAILURE, id } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}
