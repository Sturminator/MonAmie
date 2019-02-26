// These are the redux user action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const imagesConstants = {
    INDEX_REQUEST: 'USER_INDEX_REQUEST',
    INDEX_SUCCESS: 'USER_INDEX_SUCCESS',
    INDEX_FAILURE: 'USER_INDEX_FAILURE',

    VIEWIMAGE_REQUEST: 'USER_VIEWIMAGE__REQUEST',
    VIEWIMAGE_SUCCESS: 'USER_VIEWIMAGE_SUCCESS',
    VIEWIMAGE_FAILURE: 'USER_VIEWIMAGE_FAILURE',

    UPLOADIMAGE_REQUEST: 'USER_UPLOADIMAGE_REQUEST',
    UPLOADIMAGE_SUCCESS: 'USER_UPLOADIMAGE_SUCCESS',
    UPLOADIMAGE_FAILURE: 'USER_UPLOADIMAGE_FAILURE'
};