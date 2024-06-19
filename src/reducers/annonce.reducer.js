import { annonceConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    annonces: [],
    error: null,
    annonceDetail: {}
};

export const annonceReducer = (state = initialState, action) => {
    switch (action.type) {
        case annonceConstants.CREATE_ANNONCE_REQUEST:
        case annonceConstants.GET_ALL_ANNONCES_REQUEST:
        case annonceConstants.GET_ANNONCE_REQUEST:
        case annonceConstants.UPDATE_ANNONCE_REQUEST:
        case annonceConstants.DELETE_ANNONCE_REQUEST:
       
            return {
                ...state,
                loading: true,
                error: null
            };
        case annonceConstants.CREATE_ANNONCE_SUCCESS:
            return {
                ...state,
                loading: false,
                annonces: [...state.annonces, action.payload.annonce]
            };
        case annonceConstants.GET_ALL_ANNONCES_SUCCESS:
            return {
                ...state,
                loading: false,
                annonces: action.payload.annonces
            };
        case annonceConstants.GET_ANNONCE_SUCCESS:
            return {
                ...state,
                loading: false,
                annonceDetail: action.payload.annonce
            };
        case annonceConstants.UPDATE_ANNONCE_SUCCESS:
            return {
                ...state,
                loading: false,
                annonces: state.annonces.map(annonce => 
                    annonce._id === action.payload.annonce._id ? action.payload.annonce : annonce
                )
            };
        case annonceConstants.DELETE_ANNONCE_SUCCESS:
            return {
                ...state,
                loading: false,
                annonces: state.annonces.filter(annonce => annonce._id !== action.payload.annonceId)
            };
      
            
        case annonceConstants.CREATE_ANNONCE_FAILURE:
        case annonceConstants.GET_ALL_ANNONCES_FAILURE:
        case annonceConstants.GET_ANNONCE_FAILURE:
        case annonceConstants.UPDATE_ANNONCE_FAILURE:
        case annonceConstants.DELETE_ANNONCE_FAILURE:
       
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
