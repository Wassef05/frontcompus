import axios from 'axios';
import { impressionProfConstants } from './constantes';

// export const addImpressionProf = (formData, config) => async (dispatch) => {
//     try {
//       dispatch({ type: impressionProfConstants.IMPRESSIONPROF_CREATE_REQUEST });
  
//       // Effectuer la requête HTTP pour créer un nouveau impressionProf
//       const { data } = await axios.post('http://localhost:8080/impressionProf/new', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data' // Assurez-vous que le type de contenu est correctement défini pour les fichiers
//         }
//       });
  
//       dispatch({
//         type: impressionProfConstants.IMPRESSIONPROF_CREATE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: impressionProfConstants.IMPRESSIONPROF_CREATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//     /        ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

export const addImpressionProf = (formData) => async (dispatch, getState) => {
  // Obtenez l'état actuel de l'authentification à partir du Redux store
  const { auth } = getState();
  const token = auth.user.accessToken; // Assurez-vous que le chemin d'accès au token est correct

  // Si aucun token n'est trouvé, retournez une erreur
  if (!token) {
    console.error("Aucun token d'authentification fourni");
    dispatch({
      type: impressionProfConstants.IMPRESSIONPROF_CREATE_FAIL,
      payload: { error: "Aucun token d'authentification fourni" }
    });
    return;
  }

  dispatch({ type: impressionProfConstants.IMPRESSIONPROF_CREATE_REQUEST });

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': token, // Inclure le token d'authentification ici
      }
    };

    const { data } = await axios.post('http://localhost:8080/impressionProf/new', formData, config);

    dispatch({
      type: impressionProfConstants.IMPRESSIONPROF_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error from backend:", error);
    dispatch({
      type: impressionProfConstants.IMPRESSIONPROF_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : "Erreur inconnue",
    });
  }
};

  export const getAllImpressionProfs = () => async (dispatch) => {
    try {
      dispatch({ type: impressionProfConstants.GET_ALL_IMPRESSIONPROF_REQUEST });
  
      const { data } = await axios.get('http://localhost:8080/impressionProf/impressionProfs');
  
      dispatch({
        type: impressionProfConstants.GET_ALL_IMPRESSIONPROF_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: impressionProfConstants.GET_ALL_IMPRESSIONPROF_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const getImpressionProfById = (id) => async (dispatch) => {
    try {
      dispatch({ type: impressionProfConstants.GET_IMPRESSIONPROF_REQUEST });
  
      const { data } = await axios.get(`http://localhost:8080/impressionProf/impressionProfs/${id}`);
  
      dispatch({
        type: impressionProfConstants.GET_IMPRESSIONPROF_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: impressionProfConstants.GET_IMPRESSIONPROF_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  export const updateImpressionProf = (id, formData, config) => async (dispatch) => {
    try {
      dispatch({ type: impressionProfConstants.EDIT_IMPRESSIONPROF_REQUEST });
  
      const { data } = await axios.put(`http://localhost:8080/impressionProf/impressionProfs/update/${id}`, formData, config);
  
      dispatch({
        type: impressionProfConstants.EDIT_IMPRESSIONPROF_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: impressionProfConstants.EDIT_IMPRESSIONPROF_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  

  export const deleteImpressionProf = (id) => async (dispatch) => {
    try {
      dispatch({ type: impressionProfConstants.DELETE_IMPRESSIONPROF_REQUEST });
  
      await axios.delete(`http://localhost:8080/impressionProf/impressionProfs/delete/${id}`);
  
      dispatch({
        type: impressionProfConstants.DELETE_IMPRESSIONPROF_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: impressionProfConstants.DELETE_IMPRESSIONPROF_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
  // export const getImpressionProfsByUser = (userId) => async (dispatch) => {
  //   try {
  //     dispatch({ type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_REQUEST });
  
  //     const { data } = await axios.get(`http://localhost:8080/impressionProf/impressionProf/user/${userId}`);
  
  //     dispatch({
  //       type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_FAILURE,
  //       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
  //     });
  //   }
  // };
  export const getImpressionProfsByUser = () => async (dispatch, getState) => {
    dispatch({ type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_REQUEST });
  
    // Obtenez le token d'authentification actuel à partir du state Redux
    const {
      auth: { user },
    } = getState();
  
    // Assurez-vous que l'utilisateur est connecté et que le token est présent
    if (!user || !user.accessToken) {
      dispatch({
        type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_FAILURE,
        payload: { message: "Aucun token d'authentification." },
      });
      return;
    }
  
    const config = {
      headers: {
        'x-access-token': user.accessToken, // Assurez-vous que le nom de l'en-tête est correct
      },
    };
  
    try {
      const { data } = await axios.get(`http://localhost:8080/impressionProf/impressionProf/user/${user.id}`, config);
  
      dispatch({
        type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_FAILURE,
        payload: { message: error.response?.data.message || "Erreur inconnue" },
      });
    }
  };