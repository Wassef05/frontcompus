import axios from 'axios';
import { materielProfConstants } from './constantes';

export const addMaterielProf = (materielProfData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni pour l'materielProf");
            dispatch({
                type: materielProfConstants.ADD_MATERIELPROF_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }

        dispatch({ type: materielProfConstants.ADD_MATERIELPROF_REQUEST });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Ajout de l'ID de l'utilisateur aux données de l'materielProf
            const materielProfPayload = { ...materielProfData, user: userId };
            const res = await axios.post(`http://localhost:8080/materielProf/materielProf/new`, materielProfPayload, config);
            
            dispatch({
                type: materielProfConstants.ADD_MATERIELPROF_SUCCESS,
                payload: { materielProf: res.data }
            });

            
            const notificationPayload = {
                type: 'MaterielProf',
                relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'materielProf ajoutée
                onModel: 'MaterielProf' // Le modèle correspondant à votre schéma de notification
            };
            await axios.post('http://localhost:8080/notification/notifications', notificationPayload, config);

        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: materielProfConstants.ADD_MATERIELPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir toutes les materielProfs d'un utilisateur
export const getMaterielProfsByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: materielProfConstants.GET_MATERIELPROFS_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/materielProf/materielProf/user/${userId}`);
            dispatch({
                type: materielProfConstants.GET_MATERIELPROFS_BY_USER_SUCCESS,
                payload: { materielProfs: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: materielProfConstants.GET_MATERIELPROFS_BY_USER_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour obtenir une materielProf spécifique
export const getMaterielProf = (materielProfId) => {
    return async dispatch => {
        dispatch({ type: materielProfConstants.GET_MATERIELPROF_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/materielProf/materielProf/${materielProfId}`);
            dispatch({
                type: materielProfConstants.GET_MATERIELPROF_SUCCESS,
                payload: { materielProf: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: materielProfConstants.GET_MATERIELPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour mettre à jour une materielProf
export const editMaterielProf = (materielProfId, materielProfData) => {
    return async dispatch => {
        dispatch({ type: materielProfConstants.EDIT_MATERIELPROF_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/materielProf/materielProf/update/${materielProfId}`, materielProfData);
            dispatch({
                type: materielProfConstants.EDIT_MATERIELPROF_SUCCESS,
                payload: { materielProf: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: materielProfConstants.EDIT_MATERIELPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};

// Action pour supprimer une materielProf
export const deleteMaterielProf = (materielProfId) => {
    return async dispatch => {
        dispatch({ type: materielProfConstants.DELETE_MATERIELPROF_REQUEST });
        try {
            await axios.delete(`http://localhost:8080/materielProf/materielProf/delete/${materielProfId}`);
            dispatch({
                type: materielProfConstants.DELETE_MATERIELPROF_SUCCESS,
                payload: { materielProfId }
            });
        } catch (erreur) {
            dispatch({
                type: materielProfConstants.DELETE_MATERIELPROF_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };

    
};

export const getAllMaterielProfs = () => {
    return async dispatch => {
        dispatch({ type: materielProfConstants.GET_ALL_MATERIELPROFS_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/materielProf/materielProf/list`);
            dispatch({
                type: materielProfConstants.GET_ALL_MATERIELPROFS_SUCCESS,
                payload: { materielProfs: res.data }
            });
        } catch (erreur) {
            dispatch({
                type: materielProfConstants.GET_ALL_MATERIELPROFS_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};
// export const updateMaterielProfStatus = (materielProfId, newStatus) => async dispatch => {
//     dispatch({ type: materielProfConstants.UPDATE_MATERIELPROF_STATUS_REQUEST });
//     try {
//       const response = await axios.put(`http://localhost:8080/materielProf/materielProf/status/${materielProfId}`, { statut: newStatus });
//       dispatch({ 
//         type: materielProfConstants.UPDATE_MATERIELPROF_STATUS_SUCCESS, 
//         payload: { materielProf: response.data, materielProfId: materielProfId } 
//     });
//       // Rafraîchir les données affichées ou afficher un message de succès
//     } catch (error) {
//       dispatch({
//           type: materielProfConstants.UPDATE_MATERIELPROF_STATUS_FAILURE,
//           payload: error.response && error.response.data.message ? error.response.data.message : error.message
//       });
//     }
// };