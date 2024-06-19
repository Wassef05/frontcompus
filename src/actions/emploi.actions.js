import axios from 'axios';
import { emploiConstants } from './constantes';

export const addEmploi = (emploiData) => async (dispatch) => {
  dispatch({ type: emploiConstants.CREATE_EMPLOI_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const res = await axios.post(`http://localhost:8080/emploi/new`, emploiData, config);
    dispatch({
      type: emploiConstants.CREATE_EMPLOI_SUCCESS,
      payload: { emploi: res.data }
    });
  } catch (error) {
    console.error('Error adding emploi:', error);
    let errorMessage = "Erreur inconnue";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    dispatch({
      type: emploiConstants.CREATE_EMPLOI_FAILURE,
      payload: { error: errorMessage }
    });
  }
};

  

export const getAllEmplois = () => async (dispatch) => {
  dispatch({ type: emploiConstants.GET_ALL_EMPLOIS_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/emploi/emplois`);
    dispatch({
      type: emploiConstants.GET_ALL_EMPLOIS_SUCCESS,
      payload: { emplois: res.data }
    });
  } catch (error) {
    dispatch({
      type: emploiConstants.GET_ALL_EMPLOIS_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getEmploi = (emploiId) => async (dispatch) => {
  dispatch({ type: emploiConstants.GET_EMPLOI_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/emploi/${emploiId}`);
    dispatch({
      type: emploiConstants.GET_EMPLOI_SUCCESS,
      payload: { emploi: res.data }
    });
  } catch (error) {
    dispatch({
      type: emploiConstants.GET_EMPLOI_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const editEmploi = (emploiId, emploiData) => async (dispatch) => {
  dispatch({ type: emploiConstants.UPDATE_EMPLOI_REQUEST });
  try {
    const res = await axios.put(`http://localhost:8080/emploi/update/${emploiId}`, emploiData);
    dispatch({
      type: emploiConstants.UPDATE_EMPLOI_SUCCESS,
      payload: { emploi: res.data }
    });
  } catch (error) {
    dispatch({
      type: emploiConstants.UPDATE_EMPLOI_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const deleteEmploi = (emploiId) => async (dispatch) => {
  dispatch({ type: emploiConstants.DELETE_EMPLOI_REQUEST });
  try {
    await axios.delete(`http://localhost:8080/emploi/delete/${emploiId}`);
    dispatch({
      type: emploiConstants.DELETE_EMPLOI_SUCCESS,
      payload: { emploiId }
    });
  } catch (error) {
    dispatch({
      type: emploiConstants.DELETE_EMPLOI_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};
