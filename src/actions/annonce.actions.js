import axios from 'axios';
import { annonceConstants } from './constantes';

export const addAnnonce = (annonceData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        // if (!userId) {
        //     console.error("L'ID de l'utilisateur n'est pas fourni pour annonce");
        //     dispatch({
        //         type: annonceConstants.CREATE_ANNONCE_FAILURE,
        //         payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
        //     });
        //     return;
        // }
        dispatch({ type: annonceConstants.CREATE_ANNONCE_REQUEST });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Ajout de l'ID de l'utilisateur aux données de l'annonce
            const annoncePayload = { ...annonceData, user: userId };
            console.log("Annonce data being sent:", annoncePayload);
            // Remplacez l'URL par votre URL de l'API de backend
            const res = await axios.post(`http://localhost:8080/annonce/annonce/new`, annoncePayload, config);
            dispatch({
                type: annonceConstants.CREATE_ANNONCE_SUCCESS,
                payload: { annonce: res.data }
            });
  
            const noteInfoPayload = {
                type: 'Annonce',
                relatedRecordId:res.data._id, // Assurez-vous que c'est l'ID correct de l'annonce ajoutée
                onModel: 'Annonce' // Le modèle correspondant à votre schéma de noteInfo
            };
            await axios.post('http://localhost:8080/noteInfo/noteInfos', noteInfoPayload, config);
        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: annonceConstants.CREATE_ANNONCE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
  };
  
  export const getAllAnnonces = () => async (dispatch) => {
    dispatch({ type: annonceConstants.GET_ALL_ANNONCES_REQUEST });
    try {
      const res = await axios.get(`http://localhost:8080/annonce/annonces`);
      dispatch({
        type: annonceConstants.GET_ALL_ANNONCES_SUCCESS,
        payload: { annonces: res.data }
      });
    } catch (error) {
      dispatch({
        type: annonceConstants.GET_ALL_ANNONCES_FAILURE,
        payload: { error: error.response?.data.message || "Erreur inconnue" }
      });
    }
  };
  
  export const getAnnonce = (annonceId) => async (dispatch) => {
    dispatch({ type: annonceConstants.GET_ANNONCE_REQUEST });
    try {
      const res = await axios.get(`http://localhost:8080/annonce/annonce/${annonceId}`);
      dispatch({
        type: annonceConstants.GET_ANNONCE_SUCCESS,
        payload: { annonce: res.data }
      });
    } catch (error) {
      dispatch({
        type: annonceConstants.GET_ANNONCE_FAILURE,
        payload: { error: error.response?.data.message || "Erreur inconnue" }
      });
    }
  };
  
  export const editAnnonce = (annonceId, annonceData) => async (dispatch) => {
    dispatch({ type: annonceConstants.UPDATE_ANNONCE_REQUEST });
    try {
      const res = await axios.put(`http://localhost:8080/annonce/annonce/update/${annonceId}`, annonceData);
      dispatch({
        type: annonceConstants.UPDATE_ANNONCE_SUCCESS,
        payload: { annonce: res.data }
      });
    } catch (error) {
      dispatch({
        type: annonceConstants.UPDATE_ANNONCE_FAILURE,
        payload: { error: error.response?.data.message || "Erreur inconnue" }
      });
    }
  };
  
  export const deleteAnnonce = (annonceId) => async (dispatch) => {
    dispatch({ type: annonceConstants.DELETE_ANNONCE_REQUEST });
    try {
      await axios.delete(`http://localhost:8080/annonce/annonce/delete/${annonceId}`);
      dispatch({
        type: annonceConstants.DELETE_ANNONCE_SUCCESS,
        payload: { annonceId }
      });
    } catch (error) {
      dispatch({
        type: annonceConstants.DELETE_ANNONCE_FAILURE,
        payload: { error: error.response?.data.message || "Erreur inconnue" }
      });
    }
  };
  