// import axios from 'axios';
// import { userConstants } from './constantes';


// // Action for fetching users
// export const getUsers = () => async (dispatch, getState) => {
//   dispatch({ type: userConstants.GET_USERS_REQUEST });

//   try {
//     const { user } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.accessToken}`,
//       },
//     };

//     const response = await axios.get('http://localhost:8080/app/users', config);

//     dispatch({
//       type: userConstants.GET_USERS_SUCCESS,
//       payload: { users: response.data },
//     });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     dispatch({
//       type: userConstants.GET_USERS_FAILURE,
//       payload: { error: error.response?.data.message || 'Unknown error' },
//     });
//   }
// };
// user.actions.js

import axios from 'axios';
import { USER_CONSTANTS } from './constantes'; // Assurez-vous que le chemin est correct

// export const userActions = {
//   getEtudiants,
//   // autres actions...
// };

const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: USER_CONSTANTS.FETCH_USERS_REQUEST });

    try {
      const response = await axios.get('http://localhost:8080/api/users'); // Exemple de requête API pour récupérer les utilisateurs
      dispatch({
        type: USER_CONSTANTS.FETCH_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: USER_CONSTANTS.FETCH_USERS_FAILURE,
        error: error.message
      });
    }
  };
};

const getEtudiants = () => {
  return async (dispatch) => {
    dispatch({ type: USER_CONSTANTS.GET_ETUDIANTS_REQUEST });

    try {
      const response = await axios.get('/api/etudiants'); // Exemple de requête API pour récupérer les étudiants
      dispatch({
        type: USER_CONSTANTS.GET_ETUDIANTS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: USER_CONSTANTS.GET_ETUDIANTS_FAILURE,
        error: error.message
      });
    }
  };
};

export { getUsers, getEtudiants }; // Assurez-vous d'exporter getUsers et getEtudiants correctement
