import { formulaireStageConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    formulaireStages: [],
    error: null
};

export const formulaireStageReducer = (state = initialState, action) => {
    switch (action.type) {
        case formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                formulaireStages: action.payload.formulaireStages
            };
        case formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case formulaireStageConstants.ADD_FORMULAIRE_STAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case formulaireStageConstants.ADD_FORMULAIRE_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                formulaireStages: [...state.formulaireStages, action.payload.formulaireStage]
            };
        case formulaireStageConstants.ADD_FORMULAIRE_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case formulaireStageConstants.DELETE_FORMULAIRE_STAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case formulaireStageConstants.DELETE_FORMULAIRE_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                formulaireStages: state.formulaireStages.filter(formulaireStage => formulaireStage._id !== action.payload.id)
            };
        case formulaireStageConstants.DELETE_FORMULAIRE_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case formulaireStageConstants.EDIT_FORMULAIRE_STAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case formulaireStageConstants.EDIT_FORMULAIRE_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                formulaireStages: state.formulaireStages.map(formulaireStage => 
                    formulaireStage._id === action.payload.formulaireStage._id ? action.payload.formulaireStage : formulaireStage
                )
            };
        case formulaireStageConstants.EDIT_FORMULAIRE_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
