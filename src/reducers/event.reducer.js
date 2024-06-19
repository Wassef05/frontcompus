import { eventConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    events: [],
    error: null,
    eventDetail: {}
};

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case eventConstants.CREATE_EVENT_REQUEST:
        case eventConstants.GET_ALL_EVENTS_REQUEST:
        case eventConstants.GET_EVENT_REQUEST:
        case eventConstants.UPDATE_EVENT_REQUEST:
        case eventConstants.DELETE_EVENT_REQUEST:
       
            return {
                ...state,
                loading: true,
                error: null
            };
        case eventConstants.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload.event]
            };
        case eventConstants.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload.events
            };
        case eventConstants.GET_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                eventDetail: action.payload.event
            };
        case eventConstants.UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.map(event => 
                    event._id === action.payload.event._id ? action.payload.event : event
                )
            };
        case eventConstants.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter(event => event._id !== action.payload.eventId)
            };
      
            
        case eventConstants.CREATE_EVENT_FAILURE:
        case eventConstants.GET_ALL_EVENTS_FAILURE:
        case eventConstants.GET_EVENT_FAILURE:
        case eventConstants.UPDATE_EVENT_FAILURE:
        case eventConstants.DELETE_EVENT_FAILURE:
       
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
