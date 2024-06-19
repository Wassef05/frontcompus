import axios from 'axios';
import { coursConstants } from './constantes';

// Action pour ajouter un cours
export const addCours = (formData) => async (dispatch, getState) => {
  dispatch({ type: coursConstants.ADD_COURS_REQUEST });

  try {
    const { user } = getState().auth;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    const response = await axios.post('http://localhost:8080/cours/new', formData, config);

    dispatch({
      type: coursConstants.ADD_COURS_SUCCESS,
      payload: { cours: response.data },
    });

    return Promise.resolve();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du cours:', error);
    dispatch({
      type: coursConstants.ADD_COURS_FAILURE,
      payload: { erreur: error.response?.data.message || 'Erreur inconnue' },
    });

    return Promise.reject(error);
  }
};

// Action pour éditer un cours
export const editCours = (courseId, formData) => async (dispatch, getState) => {
    dispatch({ type: coursConstants.EDIT_COURS_REQUEST });

    try {
        const { user } = getState().auth;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        const res = await axios.put(`http://localhost:8080/cours/update/${courseId}`, formData, config);

        dispatch({
            type: coursConstants.EDIT_COURS_SUCCESS,
            payload: { cours: res.data }
        });
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: coursConstants.EDIT_COURS_FAILURE,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });
    }
};

// Action pour obtenir les cours d'un utilisateur
export const getCoursByUser = (userId) => async (dispatch) => {
    dispatch({ type: coursConstants.GET_COURS_BY_USER_REQUEST });

    try {
        const res = await axios.get(`http://localhost:8080/cours/user/${userId}`);
        dispatch({
            type: coursConstants.GET_COURS_BY_USER_SUCCESS,
            payload: { cours: res.data }
        });
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: coursConstants.GET_COURS_BY_USER_FAILURE,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });
    }
};

// Action pour consulter un cours
export const getCoursById = (courseId) => async (dispatch, getState) => {
    dispatch({ type: coursConstants.GET_COURS_BY_ID_REQUEST });

    try {
        const { user } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        const res = await axios.get(`http://localhost:8080/cours/${courseId}`, config);

        dispatch({
            type: coursConstants.GET_COURS_BY_ID_SUCCESS,
            payload: { cours: res.data }
        });
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: coursConstants.GET_COURS_BY_ID_FAILURE,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });
    }
};

// Action pour supprimer un cours
export const deleteCours = (courseId) => async (dispatch, getState) => {
    dispatch({ type: coursConstants.DELETE_COURS_REQUEST });

    try {
        const { user } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        await axios.delete(`http://localhost:8080/cours/delete/${courseId}`, config);

        dispatch({
            type: coursConstants.DELETE_COURS_SUCCESS,
            payload: { courseId }
        });

        return Promise.resolve();
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: coursConstants.DELETE_COURS_FAILURE,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });

        return Promise.reject(erreur);
    }
};
// Action pour obtenir tous les cours
export const getAllCours = () => async (dispatch, getState) => {
    dispatch({ type: coursConstants.GET_ALL_COURS_REQUEST });

    try {
        const { user } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        const res = await axios.get('http://localhost:8080/cours', config);

        dispatch({
            type: coursConstants.GET_ALL_COURS_SUCCESS,
            payload: { cours: res.data }
        });
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: coursConstants.GET_ALL_COURS_FAILURE,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });
    }
};

// Action pour obtenir l'URL signée
export const getSignedUrl = (publicId) => async (dispatch, getState) => {
    console.log('getSignedUrl called with publicId:', publicId);
    const { user } = getState().auth;
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
  
    const body = { publicId };
  
    console.log('Config for axios request:', config);
    console.log('Body for axios request:', body);
  
    try {
      const response = await axios.post('http://localhost:8080/cours/generateSignedUrl', body, config);
      console.log('Response from backend:', response.data);
      return response.data.url;
    } catch (er) {
      console.error('Error from backend:', er);
      throw er;
    }
  };