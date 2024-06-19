import { contactProfConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    contactProfs: [],
    error: null
};

export const contactProfReducer = (state = initialState, action) => {
    switch (action.type) {


        case contactProfConstants.GET_CONTACTPROFS_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
            case contactProfConstants.GET_CONTACTPROFS_BY_USER_SUCCESS:
                console.log('Updating state with', action.payload.contactProfs);
                return {
                  ...state,
                  loading: false,
                  contactProfs: action.payload.contactProfs
                };
        case contactProfConstants.GET_CONTACTPROFS_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case contactProfConstants.GET_ALL_CONTACTPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
            case contactProfConstants.GET_ALL_CONTACTPROF_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    contactProfs: action.payload 
                };
        case contactProfConstants.GET_ALL_CONTACTPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case contactProfConstants.ADD_CONTACTPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactProfConstants.ADD_CONTACTPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                contactProfs: [...state.contactProfs, action.payload.contactProf]
            };
        case contactProfConstants.ADD_CONTACTPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case contactProfConstants.DELETE_CONTACTPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactProfConstants.DELETE_CONTACTPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                contactProfs: state.contactProfs.filter(contactProf => contactProf._id !== action.payload.id)
            };
        case contactProfConstants.DELETE_CONTACTPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case contactProfConstants.EDIT_CONTACTPROF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactProfConstants.EDIT_CONTACTPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                contactProfs: state.contactProfs.map(contactProf => 
                    contactProf._id === action.payload.contactProf._id ? action.payload.contactProf : contactProf
                )
            };
        case contactProfConstants.EDIT_CONTACTPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case contactProfConstants.GET_CONTACTPROF_REQUEST:
            return {
                ...state,
                loading: true,
                contactProfDetail: {}, // Réinitialiser les détails de la contactProf
                error: null
            };
        case contactProfConstants.GET_CONTACTPROF_SUCCESS:
            return {
                ...state,
                loading: false,
                contactProfDetail: action.payload.contactProf // Mettre à jour les détails de la contactProf
            };
        case contactProfConstants.GET_CONTACTPROF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            case contactProfConstants.UPDATE_CONTACTPROF_STATUS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null // Optionnel : réinitialiser l'erreur à chaque nouvelle requête
                };
    case contactProfConstants.UPDATE_CONTACTPROF_STATUS_SUCCESS:
        // Extraction des données nécessaires du payload de l'action
        const { contactProfId, contactProf: updatedAttestationData } = action.payload;
        
        const updatedAttestations = state.contactProfs.map(contactProf => {
            if (contactProf._id === contactProfId) {
                // Assurez-vous que updatedAttestationData contient les données mises à jour que vous attendez
                return { ...contactProf, ...updatedAttestationData };
            }
            return contactProf;
        });
    
        return {
            ...state,
            loading: false,
            contactProfs: updatedAttestations
        };
    
                case contactProfConstants.UPDATE_CONTACTPROF_STATUS_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload // Mettre à jour l'état avec l'erreur reçue
                    };

        default:
            return state;
    }
};
