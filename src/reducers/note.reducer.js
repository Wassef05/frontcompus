import { noteConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    notes: [],
    error: null
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {


        case noteConstants.GET_NOTES_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
        case noteConstants.GET_NOTES_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload.notes // Mettre à jour les notes avec les données reçues
            };
        case noteConstants.GET_NOTES_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case noteConstants.GET_ALL_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            };
            case noteConstants.GET_ALL_NOTE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    notes: action.payload 
                };
        case noteConstants.GET_ALL_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteConstants.ADD_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteConstants.ADD_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: [...state.notes, action.payload.note]
            };
        case noteConstants.ADD_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteConstants.DELETE_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteConstants.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.filter(note => note._id !== action.payload.id)
            };
        case noteConstants.DELETE_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case noteConstants.EDIT_NOTE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noteConstants.EDIT_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => 
                    note._id === action.payload.note._id ? action.payload.note : note
                )
            };
        case noteConstants.EDIT_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case noteConstants.GET_NOTE_REQUEST:
            return {
                ...state,
                loading: true,
                noteDetail: {}, // Réinitialiser les détails de la note
                error: null
            };
        case noteConstants.GET_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                noteDetail: action.payload.note // Mettre à jour les détails de la note
            };
        case noteConstants.GET_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
