import { notificationConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    notifications: [],
    notificationDetail: {}, 
    notificationCount: 0, // Pour stocker les détails d'une notification spécifique
    error: null
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationConstants.FETCH_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case notificationConstants.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications
            };
        case notificationConstants.FETCH_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case notificationConstants.FETCH_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                notificationDetail: {},
                error: null
            };
        case notificationConstants.FETCH_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notificationDetail: action.payload.notification
            };
        case notificationConstants.FETCH_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case notificationConstants.UPDATE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case notificationConstants.UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.map(notification =>
                    notification._id === action.payload.notification._id ? action.payload.notification : notification
                )
            };
        case notificationConstants.UPDATE_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case notificationConstants.CREATE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case notificationConstants.CREATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: [...state.notifications, action.payload.notification]
            };
        case notificationConstants.CREATE_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case notificationConstants.DELETE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case notificationConstants.DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.filter(notification => notification._id !== action.payload.id)
            };
        case notificationConstants.DELETE_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case notificationConstants.GET_NOTIFICATION_COUNT_REQUEST:
                return {
                    ...state,
                    loading: true
                };
            case notificationConstants.GET_NOTIFICATION_COUNT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    notificationCount: action.payload
                };
            case notificationConstants.GET_NOTIFICATION_COUNT_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
                case notificationConstants.RESET_NOTIFICATION_COUNT:
                    return {
                        ...state,
                        notificationCount: 0,
                    };
                    
        default:
            return state;
    }
};
