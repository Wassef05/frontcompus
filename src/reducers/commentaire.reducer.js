import { commentaireConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    commentaires: [],
    error: null,
    currentCommentaire: null,
};

export const commentairesReducer = (state = initialState, action) => {
    switch (action.type) {
      case commentaireConstants.GET_ALL_COMMENTAIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case commentaireConstants.GET_ALL_COMMENTAIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          commentaires: action.payload.commentaires,
        };
      case commentaireConstants.GET_ALL_COMMENTAIRE_BY_COUR_REQUEST:
        return {
          ...state,
          loading: false,
          commentaires: action.payload.commentaires,
        };
      case commentaireConstants.GET_ALL_COMMENTAIRE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.erreur,
        };
      case commentaireConstants.ADD_COMMENTAIRE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case commentaireConstants.ADD_COMMENTAIRE_SUCCESS:
        return {
          ...state,
          loading: false,
          commentaires: [action.payload.commentaires, ...state.commentaires],
        };
      case commentaireConstants.ADD_COMMENTAIRE_FAILURE:
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
