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
                items: action.userImageIds
            };
        case imagesConstants.INDEX_FAILURE:
            return {
                error: action.error
            };



        case imagesConstants.VIEWIMAGE_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.VIEWIMAGE_SUCCESS:
            return {
                items: action.imageItem
            };
        case imagesConstants.VIEWIMAGE_FAILURE:
            return {
                error: action.error
            };



        case imagesConstants.UPLOADIMAGE_REQUEST:
            return {
                loading: true,
                id: action.id
            };
        case imagesConstants.UPLOADIMAGE_SUCCESS:
            return {
                items: action.requests
            };
        case imagesConstants.UPLOADIMAGE_FAILURE:
            return {
                error: action.error
            };

        case authConstants.LOGOUT:
            return {}
        default:
            return state;
    }
}