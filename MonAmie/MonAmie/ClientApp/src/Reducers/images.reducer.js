import { imagesConstants } from '../Constants';
import { authConstants } from '../Constants';

export function images(state = {}, action) {
    switch (action.type) {
        case imagesConstants.INDEX_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.INDEX_SUCCESS:
            return {
                loading: false,
                items: action.images
            };
        case imagesConstants.INDEX_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case imagesConstants.VIEWIMAGE_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.VIEWIMAGE_SUCCESS:
            return {
                loading: false,
                items: action.image
            };
        case imagesConstants.VIEWIMAGE_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case imagesConstants.UPLOADIMAGE_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.UPLOADIMAGE_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case imagesConstants.UPLOADIMAGE_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case imagesConstants.UPLOAD_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.UPLOAD_SUCCESS:
            return {
                loading: false,
                items: action.requests
            };
        case imagesConstants.UPLOAD_FAILURE:
            return {
                loading: false,
                error: action.error
            };

        case authConstants.LOGOUT:
            return {}
        default:
            return state;
    }
}