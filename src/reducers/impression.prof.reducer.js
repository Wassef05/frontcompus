import { impressionProfConstants } from '../actions/constantes';

const initialState = {
  loading: false,
  impressionProfs: [],
  userImpressionProfs:[], // Pour stocker tous les impressionProfs
  impressionProf: null, // Pour stocker un impressionProf sélectionné
  error: null,
};

export const impressionProfReducer = (state = initialState, action) => {
  switch (action.type) {
    case impressionProfConstants.IMPRESSIONPROF_CREATE_REQUEST:
    case impressionProfConstants.GET_ALL_IMPRESSIONPROF_REQUEST:
    case impressionProfConstants.GET_IMPRESSIONPROF_REQUEST:
    case impressionProfConstants.EDIT_IMPRESSIONPROF_REQUEST:
    case impressionProfConstants.DELETE_IMPRESSIONPROF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

      case impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_REQUEST:
  return {
    ...state,
    loading: true,
  };
case impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_SUCCESS:
  return {
    ...state,
    loading: false,
    userImpressionProfs: action.payload, // Vous pouvez choisir de stocker cela séparément
  };
case impressionProfConstants.GET_IMPRESSIONPROFS_BY_USER_FAILURE:
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
    case impressionProfConstants.IMPRESSIONPROF_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        impressionProfs: [...state.impressionProfs, action.payload],
        error: null,
      };
    case impressionProfConstants.GET_ALL_IMPRESSIONPROF_SUCCESS:
      return {
        ...state,
        loading: false,
        impressionProfs: action.payload,
        error: null,
      };
    case impressionProfConstants.GET_IMPRESSIONPROF_SUCCESS:
      return {
        ...state,
        loading: false,
        impressionProf: action.payload,
        error: null,
      };
    case impressionProfConstants.EDIT_IMPRESSIONPROF_SUCCESS:
      return {
        ...state,
        loading: false,
        impressionProfs: state.impressionProfs.map((impressionProf) =>
          impressionProf._id === action.payload._id ? action.payload : impressionProf
        ),
        error: null,
      };
    case impressionProfConstants.DELETE_IMPRESSIONPROF_SUCCESS:
      return {
        ...state,
        loading: false,
        impressionProfs: state.impressionProfs.filter((impressionProf) => impressionProf._id !== action.payload),
        error: null,
      };
    case impressionProfConstants.IMPRESSIONPROF_CREATE_FAIL:
    case impressionProfConstants.GET_ALL_IMPRESSIONPROF_FAILURE:
    case impressionProfConstants.GET_IMPRESSIONPROF_FAILURE:
    case impressionProfConstants.EDIT_IMPRESSIONPROF_FAILURE:
    case impressionProfConstants.DELETE_IMPRESSIONPROF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
