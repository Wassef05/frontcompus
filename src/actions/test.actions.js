import axios from 'axios';
import { testConstants } from './constantes';

export const addTest = (formData, config) => async (dispatch) => {
    try {
      dispatch({ type: testConstants.TEST_CREATE_REQUEST });
  
      // Effectuer la requête HTTP pour créer un nouveau test
      const { data } = await axios.post('http://localhost:8080/file/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Assurez-vous que le type de contenu est correctement défini pour les fichiers
        }
      });
  
      dispatch({
        type: testConstants.TEST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: testConstants.TEST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getAllTests = () => async (dispatch) => {
    try {
      dispatch({ type: testConstants.GET_ALL_TEST_REQUEST });
  
      const { data } = await axios.get('http://localhost:8080/file/files');
  
      dispatch({
        type: testConstants.GET_ALL_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: testConstants.GET_ALL_TEST_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const getTestById = (id) => async (dispatch) => {
    try {
      dispatch({ type: testConstants.GET_TEST_REQUEST });
  
      const { data } = await axios.get(`http://localhost:8080/file/file/${id}`);
  
      dispatch({
        type: testConstants.GET_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: testConstants.GET_TEST_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const updateTest = (id, formData, config) => async (dispatch) => {
    try {
      dispatch({ type: testConstants.EDIT_TEST_REQUEST });
  
      const { data } = await axios.put(`http://localhost:8080/file/files/update/${id}`, formData, config);
  
      dispatch({
        type: testConstants.EDIT_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: testConstants.EDIT_TEST_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  

  export const deleteTest = (id) => async (dispatch) => {
    try {
      dispatch({ type: testConstants.DELETE_TEST_REQUEST });
  
      await axios.delete(`http://localhost:8080/file/files/delete/${id}`);
  
      dispatch({
        type: testConstants.DELETE_TEST_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: testConstants.DELETE_TEST_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  