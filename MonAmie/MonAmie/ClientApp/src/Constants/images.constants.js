﻿// These are the redux image action types that are able to be dispatched in the app
// Async actions that perform http requests involve a request followed by a success or error response.

export const imagesConstants = {
    INDEX_REQUEST: 'IMAGES_INDEX_REQUEST',
    INDEX_SUCCESS: 'IMAGES_INDEX_SUCCESS',
    INDEX_FAILURE: 'IMAGES_INDEX_FAILURE',

    VIEWIMAGE_REQUEST: 'IMAGES_VIEWIMAGE__REQUEST',
    VIEWIMAGE_SUCCESS: 'IMAGES_VIEWIMAGE_SUCCESS',
    VIEWIMAGE_FAILURE: 'IMAGES_VIEWIMAGE_FAILURE',

    UPLOADIMAGE_REQUEST: 'IMAGES_UPLOADIMAGE_REQUEST',
    UPLOADIMAGE_SUCCESS: 'IMAGES_UPLOADIMAGE_SUCCESS',
    UPLOADIMAGE_FAILURE: 'IMAGES_UPLOADIMAGE_FAILURE',

    UPLOAD_REQUEST: 'IMAGES_UPLOAD_REQUEST',
    UPLOAD_SUCCESS: 'IMAGES_UPLOAD_SUCCESS',
    UPLOAD_FAILURE: 'IMAGES_UPLOAD_FAILURE'
};