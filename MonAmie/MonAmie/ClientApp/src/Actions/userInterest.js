import { userInterestConstants, authConstants } from '../Constants';
import { userInterestService, authService } from '../Services';
import { alertActions } from '../Actions';
import { history } from '../Helpers';

export const userInterestActions = {
    getAll,
    logout
};

function getAll() {

}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}
