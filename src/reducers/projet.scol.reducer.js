import { projetConstants } from '../actions/constantes';

const initialState = {
  loading: false,
  projets: [], // Pour stocker tous les projets
  projet: null, // Pour stocker un projet sélectionné
  error: null,
};

export const projetReducer = (state = initialState, action) => {
  switch (action.type) {
    case projetConstants.PROJET_CREATE_REQUEST:
    case projetConstants.GET_ALL_PROJET_REQUEST:
    case projetConstants.GET_PROJET_REQUEST:
    case projetConstants.EDIT_PROJET_REQUEST:
    case projetConstants.DELETE_PROJET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case projetConstants.PROJET_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        projets: [...state.projets, action.payload],
        error: null,
      };
    case projetConstants.GET_ALL_PROJET_SUCCESS:
      return {
        ...state,
        loading: false,
        projets: action.payload,
        error: null,
      };
    case projetConstants.GET_PROJET_SUCCESS:
      return {
        ...state,
        loading: false,
        projet: action.payload,
        error: null,
      };
    case projetConstants.EDIT_PROJET_SUCCESS:
      return {
        ...state,
        loading: false,
        projets: state.projets.map((projet) =>
          projet._id === action.payload._id ? action.payload : projet
        ),
        error: null,
      };
    case projetConstants.DELETE_PROJET_SUCCESS:
      return {
        ...state,
        loading: false,
        projets: state.projets.filter((projet) => projet._id !== action.payload),
        error: null,
      };
    case projetConstants.PROJET_CREATE_FAIL:
    case projetConstants.GET_ALL_PROJET_FAILURE:
    case projetConstants.GET_PROJET_FAILURE:
    case projetConstants.EDIT_PROJET_FAILURE:
    case projetConstants.DELETE_PROJET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
