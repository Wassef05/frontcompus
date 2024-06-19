import { reclamationConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    reclamations: [],
    error: null
};

export const reclamationReducer = (state = initialState, action) => {
    switch (action.type) {


        case reclamationConstants.GET_RECLAMATIONS_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
        case reclamationConstants.GET_RECLAMATIONS_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                reclamations: action.payload.reclamations // Mettre à jour les reclamations avec les données reçues
            };
        case reclamationConstants.GET_RECLAMATIONS_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case reclamationConstants.GET_ALL_RECLAMATION_REQUEST:
            return {
                ...state,
                loading: true
            };
            case reclamationConstants.GET_ALL_RECLAMATION_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    reclamations: action.payload 
                };
        case reclamationConstants.GET_ALL_RECLAMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case reclamationConstants.ADD_RECLAMATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case reclamationConstants.ADD_RECLAMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                reclamations: [...state.reclamations, action.payload.reclamation]
            };
        case reclamationConstants.ADD_RECLAMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case reclamationConstants.DELETE_RECLAMATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case reclamationConstants.DELETE_RECLAMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                reclamations: state.reclamations.filter(reclamation => reclamation._id !== action.payload.id)
            };
        case reclamationConstants.DELETE_RECLAMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case reclamationConstants.EDIT_RECLAMATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case reclamationConstants.EDIT_RECLAMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                reclamations: state.reclamations.map(reclamation => 
                    reclamation._id === action.payload.reclamation._id ? action.payload.reclamation : reclamation
                )
            };
        case reclamationConstants.EDIT_RECLAMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case reclamationConstants.GET_RECLAMATION_REQUEST:
            return {
                ...state,
                loading: true,
                reclamationDetail: {}, // Réinitialiser les détails de la reclamation
                error: null
            };
        case reclamationConstants.GET_RECLAMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                reclamationDetail: action.payload.reclamation // Mettre à jour les détails de la reclamation
            };
        case reclamationConstants.GET_RECLAMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            case reclamationConstants.UPDATE_RECLAMATION_RESPONSE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur à chaque nouvelle requête
            };

        // Gérer le succès de la mise à jour de la réponse de la réclamation
        case reclamationConstants.UPDATE_RECLAMATION_RESPONSE_SUCCESS:
            const { reclamationId, reclamation: updatedReclamationData } = action.payload;
            
            const updatedReclamations = state.reclamations.map(reclamation => {
                if (reclamation._id === reclamationId) {
                    // Assurer que updatedReclamationData contient les données mises à jour pour "réponse"
                    return { ...reclamation, ...updatedReclamationData };
                }
                return reclamation;
            });
        
            return {
                ...state,
                loading: false,
                reclamations: updatedReclamations
            };

        // Gérer l'échec de la mise à jour de la réponse de la réclamation
        case reclamationConstants.UPDATE_RECLAMATION_RESPONSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        default:
            return state;
    }
};
