// user.reducer.js

import { USER_CONSTANTS } from '../actions/constantes';

const initialState = {
  users: [],
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONSTANTS.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_CONSTANTS.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case USER_CONSTANTS.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export { userReducer }; // Assurez-vous d'exporter le réducteur correctement

