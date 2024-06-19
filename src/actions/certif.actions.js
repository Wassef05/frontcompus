// src/actions/certifActions.js
import axios from 'axios';
import { certifConstants } from './constantes';

// export const addCertif = (certifData) => async (dispatch) => {
//   dispatch({ type: certifConstants.CREATE_CERTIF_REQUEST });
//   try {
//     const res = await axios.post(`http://localhost:8080/certif/certif/new`, certifData);
//     dispatch({
//       type: certifConstants.CREATE_CERTIF_SUCCESS,
//       payload: { certif: res.data }

//     });
//     const noteInfoPayload = {
//       type: 'Certif',
//       relatedRecordId: res.data._id, // Assurez-vous que c'est l'ID correct de l'certif ajoutée
//       onModel: 'Certif' // Le modèle correspondant à votre schéma de noteInfo
//   };
//   await axios.post('http://localhost:8080/noteInfo/noteInfos', noteInfoPayload);
    
//   } catch (error) {
//     dispatch({
//       type: certifConstants.CREATE_CERTIF_FAILURE,
//       payload: { error: error.response?.data.message || "Erreur inconnue" }
//     });
//   }
// };
export const addCertif = (certifData, userId) => {
  return async (dispatch) => {
      // Vérification si userId est défini
      // if (!userId) {
      //     console.error("L'ID de l'utilisateur n'est pas fourni pour certif");
      //     dispatch({
      //         type: certifConstants.CREATE_CERTIF_FAILURE,
      //         payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
      //     });
      //     return;
      // }
      dispatch({ type: certifConstants.CREATE_CERTIF_REQUEST });
      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          };
          // Ajout de l'ID de l'utilisateur aux données de l'certif
          const certifPayload = { ...certifData, user: userId };
          console.log("Certif data being sent:", certifPayload);
          // Remplacez l'URL par votre URL de l'API de backend
          const res = await axios.post(`http://localhost:8080/certif/certif/new`, certifPayload, config);
          dispatch({
              type: certifConstants.CREATE_CERTIF_SUCCESS,
              payload: { certif: res.data }
          });

          const noteInfoPayload = {
              type: 'Certification',
              relatedRecordId:res.data._id, // Assurez-vous que c'est l'ID correct de l'certif ajoutée
              onModel: 'Certif' // Le modèle correspondant à votre schéma de noteInfo
          };
          await axios.post('http://localhost:8080/noteInfo/noteInfos', noteInfoPayload, config);
      } catch (erreur) {
          console.error("Error from backend:", erreur);
          dispatch({
              type: certifConstants.CREATE_CERTIF_FAILURE,
              payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
          });
      }
  };
};

export const getAllCertifs = () => async (dispatch) => {
  dispatch({ type: certifConstants.GET_ALL_CERTIFS_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/certif/certifs`);
    dispatch({
      type: certifConstants.GET_ALL_CERTIFS_SUCCESS,
      payload: { certifs: res.data }
    });
  } catch (error) {
    dispatch({
      type: certifConstants.GET_ALL_CERTIFS_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getCertif = (certifId) => async (dispatch) => {
  dispatch({ type: certifConstants.GET_CERTIF_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/certif/certif/${certifId}`);
    dispatch({
      type: certifConstants.GET_CERTIF_SUCCESS,
      payload: { certif: res.data }
    });
  } catch (error) {
    dispatch({
      type: certifConstants.GET_CERTIF_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const editCertif = (certifId, certifData) => async (dispatch) => {
  dispatch({ type: certifConstants.UPDATE_CERTIF_REQUEST });
  try {
    const res = await axios.put(`http://localhost:8080/certif/certif/update/${certifId}`, certifData);
    dispatch({
      type: certifConstants.UPDATE_CERTIF_SUCCESS,
      payload: { certif: res.data }
    });
  } catch (error) {
    dispatch({
      type: certifConstants.UPDATE_CERTIF_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const deleteCertif = (certifId) => async (dispatch) => {
  dispatch({ type: certifConstants.DELETE_CERTIF_REQUEST });
  try {
    await axios.delete(`http://localhost:8080/certif/certif/delete/${certifId}`);
    dispatch({
      type: certifConstants.DELETE_CERTIF_SUCCESS,
      payload: { certifId }
    });
  } catch (error) {
    dispatch({
      type: certifConstants.DELETE_CERTIF_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};
