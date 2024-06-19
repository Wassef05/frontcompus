import axios from 'axios';
import { formulaireStageConstants } from './constants';

export const getAllFormulaireStages = () => {
    return async dispatch => {
        dispatch({ type: formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_REQUEST });
        try {
            const res = await axios.get('/api/chemin/listeFormulaireStages');
            if (res.status === 200) {
                dispatch({ 
                    type: formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_SUCCESS, 
                    payload: { formulaireStages: res.data }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: formulaireStageConstants.GET_ALL_FORMULAIRE_STAGE_FAILURE, 
                payload: { erreur: erreur.response.data.message }
            });
        }
    };
};

export const addFormulaireStage = (formulaireData) => {
    return async dispatch => {
        dispatch({ type: formulaireStageConstants.ADD_FORMULAIRE_STAGE_REQUEST });
        try {
            const res = await axios.post('/api/chemin/ajouterFormulaireStage', formulaireData);
            if (res.status === 201) {
                dispatch({ 
                    type: formulaireStageConstants.ADD_FORMULAIRE_STAGE_SUCCESS, 
                    payload: { formulaireStage: res.data }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: formulaireStageConstants.ADD_FORMULAIRE_STAGE_FAILURE, 
                payload: { erreur: erreur.response.data.message }
            });
        }
    };
};
export const editFormulaireStage = (id, formulaireData) => {
    return async dispatch => {
        dispatch({ type: formulaireStageConstants.EDIT_FORMULAIRE_STAGE_REQUEST });
        try {
            const res = await axios.put(`/api/chemin/modifierFormulaireStage/${id}`, formulaireData);
            if (res.status === 200) {
                dispatch({ 
                    type: formulaireStageConstants.EDIT_FORMULAIRE_STAGE_SUCCESS, 
                    payload: { formulaireStage: res.data }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: formulaireStageConstants.EDIT_FORMULAIRE_STAGE_FAILURE, 
                payload: { erreur: erreur.response.data.message }
            });
        }
    };
};
export const deleteFormulaireStage = (id) => {
    return async dispatch => {
        dispatch({ type: formulaireStageConstants.DELETE_FORMULAIRE_STAGE_REQUEST });
        try {
            const res = await axios.delete(`/api/chemin/supprimerFormulaireStage/${id}`);
            if (res.status === 200) {
                dispatch({ 
                    type: formulaireStageConstants.DELETE_FORMULAIRE_STAGE_SUCCESS, 
                    payload: { id }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: formulaireStageConstants.DELETE_FORMULAIRE_STAGE_FAILURE, 
                payload: { erreur: erreur.response.data.message }
            });
        }
    };
};

