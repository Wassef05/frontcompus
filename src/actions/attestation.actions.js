import axios from 'axios';
import { attestationConstants } from './constantes';

export const addAttestation = (attestationData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni pour l'attestation");
            dispatch({
                type: attestationConstants.ADD_ATTESTATION_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }

        dispatch({ type: attestationConstants.ADD_ATTESTATION_REQUEST });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Ajout de l'ID de l'utilisateur aux données de l'attestation
            const attestationPayload = { ...attestationData, user: userId };
            const res = await axios.post(`http://localhost:8080/attestation/attestation/new`, attestationPayload, config);
            
            dispatch({
                type: attestationConstants.ADD_ATTESTATION_SUCCESS,
                payload: { attestation: res.data }
            });

            // Création de la notification
            const notificationPayload = {
                type: 'Attestation',
                relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'attestation ajoutée
                onModel: 'Attestation' // Le modèle correspondant à votre schéma de notification
            };
            await axios.post('http://localhost:8080/notification/notifications', notificationPayload, config);

        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: attestationConstants.ADD_ATTESTATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir toutes les attestations d'un utilisateur
export const getAttestationsByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: attestationConstants.GET_ATTESTATIONS_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/attestation/attestation/user/${userId}`);
            dispatch({
                type: attestationConstants.GET_ATTESTATIONS_BY_USER_SUCCESS,
                payload: { attestations: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: attestationConstants.GET_ATTESTATIONS_BY_USER_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir une attestation spécifique
export const getAttestation = (attestationId) => {
    return async dispatch => {
        dispatch({ type: attestationConstants.GET_ATTESTATION_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/attestation/attestation/${attestationId}`);
            dispatch({
                type: attestationConstants.GET_ATTESTATION_SUCCESS,
                payload: { attestation: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: attestationConstants.GET_ATTESTATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour mettre à jour une attestation
export const editAttestation = (attestationId, attestationData) => {
    return async dispatch => {
        dispatch({ type: attestationConstants.EDIT_ATTESTATION_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/attestation/attestation/update/${attestationId}`, attestationData);
            dispatch({
                type: attestationConstants.EDIT_ATTESTATION_SUCCESS,
                payload: { attestation: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: attestationConstants.EDIT_ATTESTATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour supprimer une attestation
export const deleteAttestation = (attestationId) => {
    return async dispatch => {
        dispatch({ type: attestationConstants.DELETE_ATTESTATION_REQUEST });
        try {
            await axios.delete(`http://localhost:8080/attestation/attestation/delete/${attestationId}`);
            dispatch({
                type: attestationConstants.DELETE_ATTESTATION_SUCCESS,
                payload: { attestationId }
            });
        } catch (erreur) {
            dispatch({
                type: attestationConstants.DELETE_ATTESTATION_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};
export const updateAttestationStatus = (attestationId, newStatus) => async dispatch => {
    dispatch({ type: attestationConstants.UPDATE_ATTESTATION_STATUS_REQUEST });
    try {
      const response = await axios.put(`http://localhost:8080/attestation/attestation/status/${attestationId}`, { statut: newStatus });
      dispatch({ 
        type: attestationConstants.UPDATE_ATTESTATION_STATUS_SUCCESS, 
        payload: { attestation: response.data, attestationId: attestationId } 
    });
      // Rafraîchir les données affichées ou afficher un message de succès
    } catch (error) {
      dispatch({
          type: attestationConstants.UPDATE_ATTESTATION_STATUS_FAILURE,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
};