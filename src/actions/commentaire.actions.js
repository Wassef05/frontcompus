import axios from 'axios';
import { commentaireConstants } from './constantes';

// Action pour ajouter un cours
export const addcommentaire = (formData) => async (dispatch, getState) => {
    dispatch({ type: commentaireConstants.ADD_COMMENTAIRE_REQUEST });
  
    try {
      const { user } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
  
      // Construisez l'objet data avec les champs requis
      const data = {
        sender: user.id,     // Supposant que user._id est l'ID de l'utilisateur actuel
        cour: formData.cour,  // Assurez-vous que formData a une propriété cour
        content: formData.content, // Assurez-vous que formData a une propriété content
        ...formData           // Incluez toutes les autres propriétés de formData
      };
  
      const response = await axios.post('http://localhost:8080/commentaire/newCommentaire', data, config);
  
      dispatch({
        type: commentaireConstants.ADD_COMMENTAIRE_SUCCESS,
        payload: { commentaire: response.data },
      });
  
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du COMMENTAIRE:', error);
      dispatch({
        type: commentaireConstants.ADD_COMMENTAIRE_FAILURE,
        payload: { erreur: error.response?.data.message || 'Erreur inconnue' },
      });
  
      return Promise.reject(error);
    }
};
export const getCommentaireByCour = (courseId) => async (dispatch, getState) => {
   // dispatch({ type: commentaireConstants.GET_ALL_COMMENTAIRE_BY_COUR_REQUEST });

    try {
        const { user } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        const res = await axios.get(`http://localhost:8080/commentaire/commentaires?cours=${courseId}`, config);

        dispatch({
            type: commentaireConstants.GET_ALL_COMMENTAIRE_BY_COUR_REQUEST,
            payload: { commentaires: res.data }
        });
        console.log(res.data);
    } catch (erreur) {
        console.error("Error from backend:", erreur);
        dispatch({
            type: commentaireConstants.GET_ALL_COMMENTAIRE_BY_COUR_REQUEST,
            payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
        });
    }
};

// Action pour éditer un cours
/*export const editCours = (courseId, formData) => async (dispatch, getState) => {
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
};*/

// Action pour obtenir les cours d'un utilisateur
/*export const getCoursByUser = (userId) => async (dispatch) => {
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
  };*/