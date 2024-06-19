import axios from 'axios';
import { projetConstants } from './constantes';

export const addProjet = (formData, config) => async (dispatch) => {
    try {
      dispatch({ type: projetConstants.PROJET_CREATE_REQUEST });
  
      // Effectuer la requête HTTP pour créer un nouveau projet
      const { data } = await axios.post('http://localhost:8080/projetScol/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Assurez-vous que le type de contenu est correctement défini pour les fichiers
        }
      });
  
      dispatch({
        type: projetConstants.PROJET_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: projetConstants.PROJET_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getAllProjets = () => async (dispatch) => {
    try {
      dispatch({ type: projetConstants.GET_ALL_PROJET_REQUEST });
  
      const { data } = await axios.get('http://localhost:8080/projetscol/projets');
  
      dispatch({
        type: projetConstants.GET_ALL_PROJET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: projetConstants.GET_ALL_PROJET_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const getProjetById = (id) => async (dispatch) => {
    try {
      dispatch({ type: projetConstants.GET_PROJET_REQUEST });
  
      const { data } = await axios.get(`http://localhost:8080/projetscol/projets/${id}`);
  
      dispatch({
        type: projetConstants.GET_PROJET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: projetConstants.GET_PROJET_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const updateProjet = (id, formData, config) => async (dispatch) => {
    try {
      dispatch({ type: projetConstants.EDIT_PROJET_REQUEST });
  
      const { data } = await axios.put(`http://localhost:8080/projetscol/projets/update/${id}`, formData, config);
  
      dispatch({
        type: projetConstants.EDIT_PROJET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: projetConstants.EDIT_PROJET_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  

  export const deleteProjet = (id) => async (dispatch) => {
    try {
      dispatch({ type: projetConstants.DELETE_PROJET_REQUEST });
  
      await axios.delete(`http://localhost:8080/projetscol/projets/delete/${id}`);
  
      dispatch({
        type: projetConstants.DELETE_PROJET_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: projetConstants.DELETE_PROJET_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  