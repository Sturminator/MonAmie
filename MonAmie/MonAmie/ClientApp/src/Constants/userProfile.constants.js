﻿// These are the redux user profile action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const userProfileConstants = {
    GETBYID_REQUEST: 'USERPROFILE_GETBYID_REQUEST',
    GETBYID_SUCCESS: 'USERPROFILE_GETBYID_SUCCESS',
    GETBYID_FAILURE: 'USERPROFILE_GETBYID_FAILURE',

    UPDATE_REQUEST: 'USERPROFILE_UPDATE_REQUEST',
    UPDATE_SUCCESS: 'USERPROFILE_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'USERPROFILE_UPDATE_FAILURE'
};