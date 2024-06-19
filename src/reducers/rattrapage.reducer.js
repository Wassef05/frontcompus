import { rattrapageConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    rattrapages: [],
    error: null
};

export const rattrapageReducer = (state = initialState, action) => {
    switch (action.type) {


        case rattrapageConstants.GET_RATTRAPAGES_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
        case rattrapageConstants.GET_RATTRAPAGES_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                rattrapages: action.payload.rattrapages // Mettre à jour les rattrapages avec les données reçues
            };
        case rattrapageConstants.GET_RATTRAPAGES_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case rattrapageConstants.GET_ALL_RATTRAPAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
            case rattrapageConstants.GET_ALL_RATTRAPAGE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    rattrapages: action.payload 
                };
        case rattrapageConstants.GET_ALL_RATTRAPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case rattrapageConstants.ADD_RATTRAPAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case rattrapageConstants.ADD_RATTRAPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rattrapages: [...state.rattrapages, action.payload.rattrapage]
            };
        case rattrapageConstants.ADD_RATTRAPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case rattrapageConstants.DELETE_RATTRAPAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case rattrapageConstants.DELETE_RATTRAPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rattrapages: state.rattrapages.filter(rattrapage => rattrapage._id !== action.payload.id)
            };
        case rattrapageConstants.DELETE_RATTRAPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case rattrapageConstants.EDIT_RATTRAPAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case rattrapageConstants.EDIT_RATTRAPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rattrapages: state.rattrapages.map(rattrapage => 
                    rattrapage._id === action.payload.rattrapage._id ? action.payload.rattrapage : rattrapage
                )
            };
        case rattrapageConstants.EDIT_RATTRAPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case rattrapageConstants.GET_RATTRAPAGE_REQUEST:
            return {
                ...state,
                loading: true,
                rattrapageDetail: {}, // Réinitialiser les détails de la rattrapage
                error: null
            };
        case rattrapageConstants.GET_RATTRAPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rattrapageDetail: action.payload.rattrapage // Mettre à jour les détails de la rattrapage
            };
        case rattrapageConstants.GET_RATTRAPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            case rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null // Réinitialiser l'erreur à chaque nouvelle requête
                };
    
            // Gérer le succès de la mise à jour de la réponse de la réclamation
            case rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_SUCCESS:
                const { rattrapageId, rattrapage: updatedRattrapageData } = action.payload;
                
                const updatedRattrapages = state.rattrapages.map(rattrapage => {
                    if (rattrapage._id === rattrapageId) {
                        // Assurer que updatedRattrapageData contient les données mises à jour pour "réponse"
                        return { ...rattrapage, ...updatedRattrapageData };
                    }
                    return rattrapage;
                });
            
                return {
                    ...state,
                    loading: false,
                    rattrapages: updatedRattrapages
                };
    
            // Gérer l'échec de la mise à jour de la réponse de la réclamation
            case rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
                };
            default:
                return state;
        }
    };