﻿import { categoryConstants } from '../Constants';

export function categories(state = {}, action) {
    switch (action.type) {
        case categoryConstants.GETALLFORUSER_REQUEST:
            return {
                loading: true,
                items: action.id.categories
            };
        case categoryConstants.GETALLFORUSER_SUCCESS:
            return {
                loading: false,
                items: action.id.categories
            };
        case categoryConstants.GETALLFORUSER_FAILURE:
            return {
                items: {},
                loading: false,
                error: action.error
            };
        case categoryConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(category =>
                    category.id === action.id
                        ? { ...category, deleting: true }
                        : category
                )
            };
        case categoryConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(category => category.id !== action.id)
            };
        case categoryConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(category => {
                    if (category.id === action.id) {
                        const { deleting, ...categoryCopy } = category;

                        return { ...categoryCopy, deleteError: action.error };
                    }

                    return category;
                })
            };
        default:
            return state
    }
}