import { alertConstants } from '../Constants/alerts';

// Allows for the display of alert notifications in the app.
// Example: dispatch(alertActions.success('Registration successful')); would display
// a success alert with the message 'Registration successful'

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}