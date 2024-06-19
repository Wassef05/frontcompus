// src/actions/eventActions.js
import axios from 'axios';
import { eventConstants } from './constantes';

// export const addEvent = (eventData) => async (dispatch) => {
//   dispatch({ type: eventConstants.CREATE_EVENT_REQUEST });
//   try {
//     const res = await axios.post(`http://localhost:8080/event/event/new`, eventData);
//     dispatch({
//       type: eventConstants.CREATE_EVENT_SUCCESS,
//       payload: { event: res.data }
//     });
//   } catch (error) {
//     dispatch({
//       type: eventConstants.CREATE_EVENT_FAILURE,
//       payload: { error: error.response?.data.message || "Erreur inconnue" }
//     });
//   }
// };
export const addEvent = (eventData, userId) => {
  return async (dispatch) => {
      // Vérification si userId est défini
      // if (!userId) {
      //     console.error("L'ID de l'utilisateur n'est pas fourni pour event");
      //     dispatch({
      //         type: eventConstants.CREATE_EVENT_FAILURE,
      //         payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
      //     });
      //     return;
      // }
      dispatch({ type: eventConstants.CREATE_EVENT_REQUEST });
      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          };
          // Ajout de l'ID de l'utilisateur aux données de l'event
          const eventPayload = { ...eventData, user: userId };
          console.log("Certif data being sent:", eventPayload);
          // Remplacez l'URL par votre URL de l'API de backend
          const res = await axios.post(`http://localhost:8080/event/event/new`, eventPayload, config);
          dispatch({
              type: eventConstants.CREATE_EVENT_SUCCESS,
              payload: { event: res.data }
          });

          const noteInfoPayload = {
              type: 'Evenement',
              relatedRecordId:res.data._id, // Assurez-vous que c'est l'ID correct de l'event ajoutée
              onModel: 'Event' // Le modèle correspondant à votre schéma de noteInfo
          };
          await axios.post('http://localhost:8080/noteInfo/noteInfos', noteInfoPayload, config);
      } catch (erreur) {
          console.error("Error from backend:", erreur);
          dispatch({
              type: eventConstants.CREATE_EVENT_FAILURE,
              payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
          });
      }
  };
};

export const getAllEvents = () => async (dispatch) => {
  dispatch({ type: eventConstants.GET_ALL_EVENTS_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/event/events`);
    dispatch({
      type: eventConstants.GET_ALL_EVENTS_SUCCESS,
      payload: { events: res.data }
    });
  } catch (error) {
    dispatch({
      type: eventConstants.GET_ALL_EVENTS_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getEvent = (eventId) => async (dispatch) => {
  dispatch({ type: eventConstants.GET_EVENT_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/event/event/${eventId}`);
    dispatch({
      type: eventConstants.GET_EVENT_SUCCESS,
      payload: { event: res.data }
    });
  } catch (error) {
    dispatch({
      type: eventConstants.GET_EVENT_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const editEvent = (eventId, eventData) => async (dispatch) => {
  dispatch({ type: eventConstants.UPDATE_EVENT_REQUEST });
  try {
    const res = await axios.put(`http://localhost:8080/event/event/update/${eventId}`, eventData);
    dispatch({
      type: eventConstants.UPDATE_EVENT_SUCCESS,
      payload: { event: res.data }
    });
  } catch (error) {
    dispatch({
      type: eventConstants.UPDATE_EVENT_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: eventConstants.DELETE_EVENT_REQUEST });
  try {
    await axios.delete(`http://localhost:8080/event/event/delete/${eventId}`);
    dispatch({
      type: eventConstants.DELETE_EVENT_SUCCESS,
      payload: { eventId }
    });
  } catch (error) {
    dispatch({
      type: eventConstants.DELETE_EVENT_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};
