import { noteInfoConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    noteInfos: [],
    noteInfoDetail: {}, 
    noteInfoCount: 0, // Pour stocker les détails d'une noteInfo spécifique
    error: null
};

export const noteInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case noteInfoConstants.FETCH_NOTEINFOS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case noteInfoConstants.FETCH_NOTEINFOS_SUCCESS:
            return {
                ...state,
                loading: false,
                noteInfos: action.payload.noteInfos
            };
        case noteInfoConstants.FETCH_NOTEINFOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteInfoConstants.FETCH_NOTEINFO_REQUEST:
            return {
                ...state,
                loading: true,
                noteInfoDetail: {},
                error: null
            };
        case noteInfoConstants.FETCH_NOTEINFO_SUCCESS:
            return {
                ...state,
                loading: false,
                noteInfoDetail: action.payload.noteInfo
            };
        case noteInfoConstants.FETCH_NOTEINFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteInfoConstants.UPDATE_NOTEINFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteInfoConstants.UPDATE_NOTEINFO_SUCCESS:
            return {
                ...state,
                loading: false,
                noteInfos: state.noteInfos.map(noteInfo =>
                    noteInfo._id === action.payload.noteInfo._id ? action.payload.noteInfo : noteInfo
                )
            };
        case noteInfoConstants.UPDATE_NOTEINFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteInfoConstants.CREATE_NOTEINFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteInfoConstants.CREATE_NOTEINFO_SUCCESS:
            return {
                ...state,
                loading: false,
                noteInfos: [...state.noteInfos, action.payload.noteInfo]
            };
        case noteInfoConstants.CREATE_NOTEINFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteInfoConstants.DELETE_NOTEINFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteInfoConstants.DELETE_NOTEINFO_SUCCESS:
            return {
                ...state,
                loading: false,
                noteInfos: state.noteInfos.filter(noteInfo => noteInfo._id !== action.payload.id)
            };
        case noteInfoConstants.DELETE_NOTEINFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case noteInfoConstants.GET_NOTEINFO_COUNT_REQUEST:
                return {
                    ...state,
                    loading: true
                };
            case noteInfoConstants.GET_NOTEINFO_COUNT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    noteInfoCount: action.payload
                };
            case noteInfoConstants.GET_NOTEINFO_COUNT_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
                case noteInfoConstants.RESET_NOTEINFO_COUNT:
                    return {
                        ...state,
                        noteInfoCount: 0,
                    };
                    
        default:
            return state;
    }
};
