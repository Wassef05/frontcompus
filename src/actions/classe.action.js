// src/actions/classeActions.js
import axios from 'axios';
import { classeConstants } from './constantes';

// const BASE_URL = "http://localhost:8080/api"; // Assurez-vous que cela correspond à la base de votre API

export const createClasse = (classeData) => async (dispatch) => {
  dispatch({ type: classeConstants.CREATE_CLASSE_REQUEST });
  try {
    const res = await axios.post(`http://localhost:8080/classe/classe/new`, classeData);
    dispatch({
      type: classeConstants.CREATE_CLASSE_SUCCESS,
      payload: { classe: res.data }
    });
  } catch (error) {
    dispatch({
      type: classeConstants.CREATE_CLASSE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getAllClasses = () => async (dispatch) => {
  dispatch({ type: classeConstants.GET_ALL_CLASSES_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/classe/classes`);
    dispatch({
      type: classeConstants.GET_ALL_CLASSES_SUCCESS,
      payload: { classes: res.data }
    });
  } catch (error) {
    dispatch({
      type: classeConstants.GET_ALL_CLASSES_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getClasseById = (id) => async (dispatch) => {
  dispatch({ type: classeConstants.GET_CLASSE_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/classe/classe/${id}`);
    dispatch({
      type: classeConstants.GET_CLASSE_SUCCESS,
      payload: { classe: res.data }
    });
  } catch (error) {
    dispatch({
      type: classeConstants.GET_CLASSE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const editClasse = (id, classeData) => async (dispatch) => {
  dispatch({ type: classeConstants.UPDATE_CLASSE_REQUEST });
  try {
    const res = await axios.put(`http://localhost:8080/classe/classe/update/${id}`, classeData);
    dispatch({
      type: classeConstants.UPDATE_CLASSE_SUCCESS,
      payload: { updatedClasse: res.data }
    });
  } catch (error) {
    dispatch({
      type: classeConstants.UPDATE_CLASSE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const deleteClasse = (id) => async (dispatch) => {
  dispatch({ type: classeConstants.DELETE_CLASSE_REQUEST });
  try {
    await axios.delete(`http://localhost:8080/classe/classe/delete/${id}`);
    dispatch({
      type: classeConstants.DELETE_CLASSE_SUCCESS,
      payload: { classeId: id }
    });
  } catch (error) {
    dispatch({
      type: classeConstants.DELETE_CLASSE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};
