// These are the redux authentication action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const authConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT',
};