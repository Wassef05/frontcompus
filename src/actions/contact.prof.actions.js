import axios from 'axios';
import { contactProfConstants } from './constantes';

export const addContactProf = (contactProfData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni pour l'contactProf");
            dispatch({
                type: contactProfConstants.ADD_CONTACTPROF_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }

        dispatch({ type: contactProfConstants.ADD_CONTACTPROF_REQUEST });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Ajout de l'ID de l'utilisateur aux données de l'contactProf
            const contactProfPayload = { ...contactProfData, user: userId };
            const res = await axios.post(`http://localhost:8080/contactProf/contactProf/new`, contactProfPayload, config);
            
            dispatch({
                type: contactProfConstants.ADD_CONTACTPROF_SUCCESS,
                payload: { contactProf: res.data }
            });

            // Création de la notification
            const notificationPayload = {
                type: 'ContactProf',
                relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'contactProf ajoutée
                onModel: 'ContactProf' // Le modèle correspondant à votre schéma de notification
            };
            await axios.post('http://localhost:8080/notification/notifications', notificationPayload, config);

        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: contactProfConstants.ADD_CONTACTPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir toutes les contactProfs d'un utilisateur
export const getContactProfsByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: contactProfConstants.GET_CONTACTPROFS_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/contactProf/contactProf/user/${userId}`);
            dispatch({
                type: contactProfConstants.GET_CONTACTPROFS_BY_USER_SUCCESS,
                payload: { contactProfs: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: contactProfConstants.GET_CONTACTPROFS_BY_USER_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir une contactProf spécifique
export const getContactProf = (contactProfId) => {
    return async dispatch => {
        dispatch({ type: contactProfConstants.GET_CONTACTPROF_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/contactProf/contactProf/${contactProfId}`);
            dispatch({
                type: contactProfConstants.GET_CONTACTPROF_SUCCESS,
                payload: { contactProf: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: contactProfConstants.GET_CONTACTPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour mettre à jour une contactProf
export const editContactProf = (contactProfId, contactProfData) => {
    return async dispatch => {
        dispatch({ type: contactProfConstants.EDIT_CONTACTPROF_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/contactProf/contactProf/update/${contactProfId}`, contactProfData);
            dispatch({
                type: contactProfConstants.EDIT_CONTACTPROF_SUCCESS,
                payload: { contactProf: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: contactProfConstants.EDIT_CONTACTPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour supprimer une contactProf
export const deleteContactProf = (contactProfId) => {
    return async dispatch => {
        dispatch({ type: contactProfConstants.DELETE_CONTACTPROF_REQUEST });
        try {
            await axios.delete(`http://localhost:8080/contactProf/contactProf/delete/${contactProfId}`);
            dispatch({
                type: contactProfConstants.DELETE_CONTACTPROF_SUCCESS,
                payload: { contactProfId }
            });
        } catch (erreur) {
            dispatch({
                type: contactProfConstants.DELETE_CONTACTPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};
export const updateContactProfStatus = (contactProfId, newStatus) => async dispatch => {
    dispatch({ type: contactProfConstants.UPDATE_CONTACTPROF_STATUS_REQUEST });
    try {
      const response = await axios.put(`http://localhost:8080/contactProf/contactProf/status/${contactProfId}`, { statut: newStatus });
      dispatch({ 
        type: contactProfConstants.UPDATE_CONTACTPROF_STATUS_SUCCESS, 
        payload: { contactProf: response.data, contactProfId: contactProfId } 
    });
      // Rafraîchir les données affichées ou afficher un message de succès
    } catch (error) {
      dispatch({
          type: contactProfConstants.UPDATE_CONTACTPROF_STATUS_FAILURE,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
};