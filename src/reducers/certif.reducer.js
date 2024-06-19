import { certifConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    certifs: [],
    error: null,
    certifDetail: {}
};

export const certifReducer = (state = initialState, action) => {
    switch (action.type) {
        case certifConstants.CREATE_CERTIF_REQUEST:
        case certifConstants.GET_ALL_CERTIFS_REQUEST:
        case certifConstants.GET_CERTIF_REQUEST:
        case certifConstants.UPDATE_CERTIF_REQUEST:
        case certifConstants.DELETE_CERTIF_REQUEST:
       
            return {
                ...state,
                loading: true,
                error: null
            };
        case certifConstants.CREATE_CERTIF_SUCCESS:
            return {
                ...state,
                loading: false,
                certifs: [...state.certifs, action.payload.certif]
            };
        case certifConstants.GET_ALL_CERTIFS_SUCCESS:
            return {
                ...state,
                loading: false,
                certifs: action.payload.certifs
            };
        case certifConstants.GET_CERTIF_SUCCESS:
            return {
                ...state,
                loading: false,
                certifDetail: action.payload.certif
            };
        case certifConstants.UPDATE_CERTIF_SUCCESS:
            return {
                ...state,
                loading: false,
                certifs: state.certifs.map(certif => 
                    certif._id === action.payload.certif._id ? action.payload.certif : certif
                )
            };
        case certifConstants.DELETE_CERTIF_SUCCESS:
            return {
                ...state,
                loading: false,
                certifs: state.certifs.filter(certif => certif._id !== action.payload.certifId)
            };
      
            
        case certifConstants.CREATE_CERTIF_FAILURE:
        case certifConstants.GET_ALL_CERTIFS_FAILURE:
        case certifConstants.GET_CERTIF_FAILURE:
        case certifConstants.UPDATE_CERTIF_FAILURE:
        case certifConstants.DELETE_CERTIF_FAILURE:
       
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
