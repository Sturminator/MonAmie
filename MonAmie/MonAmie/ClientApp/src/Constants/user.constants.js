// These are the redux user action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const userConstants = {
    GETALL_REQUEST: 'USER_GETALL_REQUEST',
    GETALL_SUCCESS: 'USER_GETALL_SUCCESS',
    GETALL_FAILURE: 'USER_GETALL_FAILURE',

    GETALLFORUSER_REQUEST: 'USER_GETALLFORUSER_REQUEST',
    GETALLFORUSER_SUCCESS: 'USER_GETALLFORUSER_SUCCESS',
    GETALLFORUSER_FAILURE: 'USER_GETALLFORUSER_FAILURE',

    GETBYID_REQUEST: 'USER_GETBYID_REQUEST',
    GETBYID_SUCCESS: 'USER_GETBYID_SUCCESS',
    GETBYID_FAILURE: 'USER_GETBYID_FAILURE'
};