import { materielProfConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    materielProfs: [],
    error: null
};

export const materielProfReducer = (state = initialState, action) => {
    switch (action.type) {
        case materielProfConstants.GET_ALL_MATERIELPROFS_REQUEST: // Corriger le nom ici
        return {
            ...state,
            loading: true
        };
    case materielProfConstants.GET_ALL_MATERIELPROFS_SUCCESS: // Corriger le nom ici
        return {
            ...state,
            loading: false,
            materielProfs: action.payload.materielProfs // Assurez-vous que le payload contient les materielProfs
        };
    case materielProfConstants.GET_ALL_MATERIELPROFS_FAILURE: // Corriger le nom ici
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };

        case materielProfConstants.GET_MATERIELPROFS_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
        case materielProfConstants.GET_MATERIELPROFS_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                materielProfs: action.payload.materielProfs // Mettre à jour les materielProfs avec les données reçues
            };
        case materielProfConstants.GET_MATERIELPROFS_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case materielProfConstants.GET_ALL_MATERIELPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
            case materielProfConstants.GET_ALL_MATERIELPROF_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    materielProfs: action.payload 
                };
        case materielProfConstants.GET_ALL_MATERIELPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case materielProfConstants.ADD_MATERIELPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case materielProfConstants.ADD_MATERIELPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                materielProfs: [...state.materielProfs, action.payload.materielProf]
            };
        case materielProfConstants.ADD_MATERIELPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case materielProfConstants.DELETE_MATERIELPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case materielProfConstants.DELETE_MATERIELPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                materielProfs: state.materielProfs.filter(materielProf => materielProf._id !== action.payload.id)
            };
        case materielProfConstants.DELETE_MATERIELPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case materielProfConstants.EDIT_MATERIELPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case materielProfConstants.EDIT_MATERIELPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                materielProfs: state.materielProfs.map(materielProf => 
                    materielProf._id === action.payload.materielProf._id ? action.payload.materielProf : materielProf
                )
            };
        case materielProfConstants.EDIT_MATERIELPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case materielProfConstants.GET_MATERIELPROF_REQUEST:
            return {
                ...state,
                loading: true,
                materielProfDetail: {}, // Réinitialiser les détails de la materielProf
                error: null
            };
        case materielProfConstants.GET_MATERIELPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                materielProfDetail: action.payload.materielProf // Mettre à jour les détails de la materielProf
            };
        case materielProfConstants.GET_MATERIELPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            case materielProfConstants.UPDATE_MATERIELPROF_STATUS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null // Optionnel : réinitialiser l'erreur à chaque nouvelle requête
                };
    case materielProfConstants.UPDATE_MATERIELPROF_STATUS_SUCCESS:
        // Extraction des données nécessaires du payload de l'action
        const { materielProfId, materielProf: updatedMaterielProfData } = action.payload;
        
        const updatedMaterielProfs = state.materielProfs.map(materielProf => {
            if (materielProf._id === materielProfId) {
                // Assurez-vous que updatedMaterielProfData contient les données mises à jour que vous attendez
                return { ...materielProf, ...updatedMaterielProfData };
            }
            return materielProf;
        });
    
        return {
            ...state,
            loading: false,
            materielProfs: updatedMaterielProfs
        };
    
                case materielProfConstants.UPDATE_MATERIELPROF_STATUS_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload // Mettre à jour l'état avec l'erreur reçue
                    };

        default:
            return state;
    }
};
