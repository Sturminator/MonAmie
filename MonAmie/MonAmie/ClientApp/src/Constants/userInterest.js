﻿// These are the redux user interest action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const userInterestConstants = {
    GETALL_REQUEST: 'INTERESTS_GETALL_REQUEST',
    GETALL_SUCCESS: 'INTERESTS_GETALL_SUCCESS',
    GETALL_FAILURE: 'INTERESTS_GETALL_FAILURE',

    GETBYID_REQUEST: 'INTERESTS_GETBYID_REQUEST',
    GETBYID_SUCCESS: 'INTERESTS_GETBYID_SUCCESS',
    GETBYID_FAILURE: 'INTERESTS_GETBYID_FAILURE',

    ADD_REQUEST: 'INTERESTS_ADD_REQUEST',
    ADD_SUCCESS: 'INTERESTS_ADD_SUCCESS',
    ADD_FAILURE: 'INTERESTS_ADD_FAILURE',

    DELETE_REQUEST: 'INTERESTS_DELETE_REQUEST',
    DELETE_SUCCESS: 'INTERESTS_DELETE_SUCCESS',
    DELETE_FAILURE: 'INTERESTS_DELETE_FAILURE'    
};