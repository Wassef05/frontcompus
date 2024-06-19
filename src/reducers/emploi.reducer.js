import { emploiConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    emplois: [],
    error: null,
    emploiDetail: {}
};

export const emploiReducer = (state = initialState, action) => {
    switch (action.type) {
        case emploiConstants.CREATE_EMPLOI_REQUEST:
        case emploiConstants.GET_ALL_EMPLOIS_REQUEST:
        case emploiConstants.GET_EMPLOI_REQUEST:
        case emploiConstants.UPDATE_EMPLOI_REQUEST:
        case emploiConstants.DELETE_EMPLOI_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case emploiConstants.CREATE_EMPLOI_SUCCESS:
            return {
                ...state,
                loading: false,
                emplois: [...state.emplois, action.payload.emploi]
            };
        case emploiConstants.GET_ALL_EMPLOIS_SUCCESS:
            return {
                ...state,
                loading: false,
                emplois: action.payload.emplois
            };
        case emploiConstants.GET_EMPLOI_SUCCESS:
            return {
                ...state,
                loading: false,
                emploiDetail: action.payload.emploi
            };
        case emploiConstants.UPDATE_EMPLOI_SUCCESS:
            return {
                ...state,
                loading: false,
                emplois: state.emplois.map(emploi => 
                    emploi._id === action.payload.emploi._id ? action.payload.emploi : emploi
                )
            };
        case emploiConstants.DELETE_EMPLOI_SUCCESS:
            return {
                ...state,
                loading: false,
                emplois: state.emplois.filter(emploi => emploi._id !== action.payload.emploiId)
            };
        case emploiConstants.CREATE_EMPLOI_FAILURE:
        case emploiConstants.GET_ALL_EMPLOIS_FAILURE:
        case emploiConstants.GET_EMPLOI_FAILURE:
        case emploiConstants.UPDATE_EMPLOI_FAILURE:
        case emploiConstants.DELETE_EMPLOI_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
