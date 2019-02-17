import { categoryConstants, authConstants } from '../Constants';
import { categoryService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const categoryActions = {
    getAll,
    getAllForUser,
    logout
};

function getAll() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

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
    function success(categories) { return { type: categoryConstants.GETALLFORUSER_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALLFORUSER_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}
