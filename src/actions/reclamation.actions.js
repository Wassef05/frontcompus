import axios from 'axios';
import { reclamationConstants } from './constantes';

export const addReclamation = (reclamationData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni pour reclamation");
            dispatch({
                type: reclamationConstants.ADD_RECLAMATION_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }
        dispatch({ type: reclamationConstants.ADD_RECLAMATION_REQUEST });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Ajout de l'ID de l'utilisateur aux données de l'reclamation
            const reclamationPayload = { ...reclamationData, user: userId };
            console.log("Reclamation data being sent:", reclamationPayload);
            // Remplacez l'URL par votre URL de l'API de backend
            const res = await axios.post(`http://localhost:8080/reclamation/reclamation/new`, reclamationPayload, config);
            dispatch({
                type: reclamationConstants.ADD_RECLAMATION_SUCCESS,
                payload: { reclamation: res.data }
            });

            const notificationPayload = {
                type: 'Reclamation',
                relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'reclamation ajoutée
                onModel: 'Reclamation' // Le modèle correspondant à votre schéma de notification
            };
            await axios.post('http://localhost:8080/notification/notifications', notificationPayload, config);
        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: reclamationConstants.ADD_RECLAMATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir toutes les reclamations d'un utilisateur
export const getReclamationsByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: reclamationConstants.GET_RECLAMATIONS_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/reclamation/reclamation/user/${userId}`);
            dispatch({
                type: reclamationConstants.GET_RECLAMATIONS_BY_USER_SUCCESS,
                payload: { reclamations: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: reclamationConstants.GET_RECLAMATIONS_BY_USER_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir une reclamation spécifique
export const getReclamation = (reclamationId) => {
    return async dispatch => {
        console.log("getReclamationactions - reclamationId:", reclamationId);
        dispatch({ type: reclamationConstants.GET_RECLAMATION_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/reclamation/reclamation/${reclamationId}`);
            dispatch({
                type: reclamationConstants.GET_RECLAMATION_SUCCESS,
                payload: { reclamation: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: reclamationConstants.GET_RECLAMATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour mettre à jour une reclamation
export const editReclamation = (reclamationId, reclamationData) => {
    return async dispatch => {
        dispatch({ type: reclamationConstants.EDIT_RECLAMATION_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/reclamation/reclamation/update/${reclamationId}`, reclamationData);
            dispatch({
                type: reclamationConstants.EDIT_RECLAMATION_SUCCESS,
                payload: { reclamation: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: reclamationConstants.EDIT_RECLAMATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour supprimer une reclamation
export const deleteReclamation = (reclamationId) => {
    return async dispatch => {
        dispatch({ type: reclamationConstants.DELETE_RECLAMATION_REQUEST });
        try {
            await axios.delete(`http://localhost:8080/reclamation/reclamation/delete/${reclamationId}`);
            dispatch({
                type: reclamationConstants.DELETE_RECLAMATION_SUCCESS,
                payload: { reclamationId }
            });
        } catch (erreur) {
            dispatch({
                type: reclamationConstants.DELETE_RECLAMATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};


export const updateReclamationResponse = (reclamationId, newResponse) => async dispatch => {
    dispatch({ type: reclamationConstants.UPDATE_RECLAMATION_RESPONSE_REQUEST });
    try {
      // L'URL doit être ajustée pour cibler l'endpoint de mise à jour de la réclamation
      const response = await axios.put(`http://localhost:8080/reclamation/reclamation/response/${reclamationId}`, { reponse: newResponse });
      dispatch({ 
        type: reclamationConstants.UPDATE_RECLAMATION_RESPONSE_SUCCESS, 
        payload: { reclamation: response.data, reclamationId: reclamationId } 
      });
      // Optionnel : Rafraîchir les données affichées ou afficher un message de succès
    } catch (error) {
      dispatch({
          type: reclamationConstants.UPDATE_RECLAMATION_RESPONSE_FAILURE,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
};