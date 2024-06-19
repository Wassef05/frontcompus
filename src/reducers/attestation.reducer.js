import { attestationConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    attestations: [],
    error: null
};

export const attestationReducer = (state = initialState, action) => {
    switch (action.type) {


        case attestationConstants.GET_ATTESTATIONS_BY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Réinitialiser l'erreur lors du début de la requête
            };
        case attestationConstants.GET_ATTESTATIONS_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                attestations: action.payload.attestations // Mettre à jour les attestations avec les données reçues
            };
        case attestationConstants.GET_ATTESTATIONS_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error // Mettre à jour l'état avec l'erreur reçue
            };
        case attestationConstants.GET_ALL_ATTESTATION_REQUEST:
            return {
                ...state,
                loading: true
            };
            case attestationConstants.GET_ALL_ATTESTATION_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    attestations: action.payload 
                };
        case attestationConstants.GET_ALL_ATTESTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case attestationConstants.ADD_ATTESTATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case attestationConstants.ADD_ATTESTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                attestations: [...state.attestations, action.payload.attestation]
            };
        case attestationConstants.ADD_ATTESTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case attestationConstants.DELETE_ATTESTATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case attestationConstants.DELETE_ATTESTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                attestations: state.attestations.filter(attestation => attestation._id !== action.payload.id)
            };
        case attestationConstants.DELETE_ATTESTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case attestationConstants.EDIT_ATTESTATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case attestationConstants.EDIT_ATTESTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                attestations: state.attestations.map(attestation => 
                    attestation._id === action.payload.attestation._id ? action.payload.attestation : attestation
                )
            };
        case attestationConstants.EDIT_ATTESTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

            case attestationConstants.GET_ATTESTATION_REQUEST:
            return {
                ...state,
                loading: true,
                attestationDetail: {}, // Réinitialiser les détails de la attestation
                error: null
            };
        case attestationConstants.GET_ATTESTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                attestationDetail: action.payload.attestation // Mettre à jour les détails de la attestation
            };
        case attestationConstants.GET_ATTESTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            case attestationConstants.UPDATE_ATTESTATION_STATUS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null // Optionnel : réinitialiser l'erreur à chaque nouvelle requête
                };
    case attestationConstants.UPDATE_ATTESTATION_STATUS_SUCCESS:
        // Extraction des données nécessaires du payload de l'action
        const { attestationId, attestation: updatedAttestationData } = action.payload;
        
        const updatedAttestations = state.attestations.map(attestation => {
            if (attestation._id === attestationId) {
                // Assurez-vous que updatedAttestationData contient les données mises à jour que vous attendez
                return { ...attestation, ...updatedAttestationData };
            }
            return attestation;
        });
    
        return {
            ...state,
            loading: false,
            attestations: updatedAttestations
        };
    
                case attestationConstants.UPDATE_ATTESTATION_STATUS_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload // Mettre à jour l'état avec l'erreur reçue
                    };

        default:
            return state;
    }
};
