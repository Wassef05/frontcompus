import axios from 'axios';
import { rattrapageConstants } from './constantes';

export const addRattrapage = (rattrapageData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni pour rattrapage");
            dispatch({
                type: rattrapageConstants.ADD_RATTRAPAGE_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }
        dispatch({ type: rattrapageConstants.ADD_RATTRAPAGE_REQUEST });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Ajout de l'ID de l'utilisateur aux données de l'rattrapage
            const rattrapagePayload = { ...rattrapageData, user: userId };
            console.log("Rattrapage data being sent:", rattrapagePayload);
            // Remplacez l'URL par votre URL de l'API de backend
            const res = await axios.post(`http://localhost:8080/rattrapage/rattrapage/new`, rattrapagePayload, config);
            dispatch({
                type: rattrapageConstants.ADD_RATTRAPAGE_SUCCESS,
                payload: { rattrapage: res.data }
            });

            const notificationPayload = {
                type: 'Rattrapage',
                relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'rattrapage ajoutée
                onModel: 'Rattrapage' // Le modèle correspondant à votre schéma de notification
            };
            await axios.post('http://localhost:8080/notification/notifications', notificationPayload, config);
       
        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: rattrapageConstants.ADD_RATTRAPAGE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir toutes les rattrapages d'un utilisateur
export const getRattrapagesByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: rattrapageConstants.GET_RATTRAPAGES_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/rattrapage/rattrapage/user/${userId}`);
            dispatch({
                type: rattrapageConstants.GET_RATTRAPAGES_BY_USER_SUCCESS,
                payload: { rattrapages: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: rattrapageConstants.GET_RATTRAPAGES_BY_USER_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir une rattrapage spécifique
export const getRattrapage = (rattrapageId) => {
    return async dispatch => {
        console.log("getRattrapageactions - rattrapageId:", rattrapageId);
        dispatch({ type: rattrapageConstants.GET_RATTRAPAGE_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/rattrapage/rattrapage/${rattrapageId}`);
            dispatch({
                type: rattrapageConstants.GET_RATTRAPAGE_SUCCESS,
                payload: { rattrapage: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: rattrapageConstants.GET_RATTRAPAGE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour mettre à jour une rattrapage
export const editRattrapage = (rattrapageId, rattrapageData) => {
    return async dispatch => {
        dispatch({ type: rattrapageConstants.EDIT_RATTRAPAGE_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/rattrapage/rattrapage/update/${rattrapageId}`, rattrapageData);
            dispatch({
                type: rattrapageConstants.EDIT_RATTRAPAGE_SUCCESS,
                payload: { rattrapage: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: rattrapageConstants.EDIT_RATTRAPAGE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour supprimer une rattrapage
export const deleteRattrapage = (rattrapageId) => {
    return async dispatch => {
        dispatch({ type: rattrapageConstants.DELETE_RATTRAPAGE_REQUEST });
        try {
            await axios.delete(`http://localhost:8080/rattrapage/rattrapage/delete/${rattrapageId}`);
            dispatch({
                type: rattrapageConstants.DELETE_RATTRAPAGE_SUCCESS,
                payload: { rattrapageId }
            });
        } catch (erreur) {
            dispatch({
                type: rattrapageConstants.DELETE_RATTRAPAGE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};



export const updateRattrapageResponse = (rattrapageId, newResponse) => async dispatch => {
    dispatch({ type: rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_REQUEST });
    try {
      // L'URL doit être ajustée pour cibler l'endpoint de mise à jour de la réclamation
      const response = await axios.put(`http://localhost:8080/rattrapage/rattrapage/update/response/${rattrapageId}`, { reponse: newResponse });
      dispatch({ 
        type: rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_SUCCESS, 
        payload: { rattrapage: response.data, rattrapageId: rattrapageId } 
      });
      // Optionnel : Rafraîchir les données affichées ou afficher un message de succès
    } catch (error) {
      dispatch({
          type: rattrapageConstants.UPDATE_RATTRAPAGE_RESPONSE_FAILURE,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
};