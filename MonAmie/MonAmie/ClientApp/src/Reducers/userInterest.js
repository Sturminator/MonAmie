import { userInterestConstants } from '../Constants';

export function userInterests(state = {}, action) {
    switch (action.type) {
        case userInterestConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userInterestConstants.GETALL_SUCCESS:
            return {
                items: action.userInterests
            };
        case userInterestConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userInterestConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(userInterest =>
                    userInterest.id === action.id
                        ? { ...userInterest, deleting: true }
                        : userInterest
                )
            };
        case userInterestConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(userInterest => userInterest.id !== action.id)
            };
        case userInterestConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(userInterest => {
                    if (userInterest.id === action.id) {
                        const { deleting, ...userInterestCopy } = userInterest;

                        return { ...userInterestCopy, deleteError: action.error };
                    }

                    return userInterest;
                })
            };
        default:
            return state
    }
}