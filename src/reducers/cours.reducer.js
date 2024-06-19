import { coursConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    cours: [],
    error: null,
    currentCours: null,
};

export const coursReducer = (state = initialState, action) => {
    switch (action.type) {
      case coursConstants.GET_ALL_COURS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case coursConstants.GET_ALL_COURS_SUCCESS:
        return {
          ...state,
          loading: false,
          cours: action.payload.cours,
        };
      case coursConstants.GET_ALL_COURS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.erreur,
        };
      case coursConstants.ADD_COURS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case coursConstants.ADD_COURS_SUCCESS:
        return {
          ...state,
          loading: false,
          cours: [action.payload.cours, ...state.cours],
        };
      case coursConstants.ADD_COURS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.erreur,
        };
      // Les autres cases restent inchangées
      default:
        return state;
    }
};
