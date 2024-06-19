import { testConstants } from '../actions/constantes';

const initialState = {
  loading: false,
  tests: [], // Pour stocker tous les tests
  test: null, // Pour stocker un test sélectionné
  error: null,
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case testConstants.TEST_CREATE_REQUEST:
    case testConstants.GET_ALL_TEST_REQUEST:
    case testConstants.GET_TEST_REQUEST:
    case testConstants.EDIT_TEST_REQUEST:
    case testConstants.DELETE_TEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case testConstants.TEST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: [...state.tests, action.payload],
        error: null,
      };
    case testConstants.GET_ALL_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: action.payload,
        error: null,
      };
    case testConstants.GET_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
        error: null,
      };
    case testConstants.EDIT_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: state.tests.map((test) =>
          test._id === action.payload._id ? action.payload : test
        ),
        error: null,
      };
    case testConstants.DELETE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: state.tests.filter((test) => test._id !== action.payload),
        error: null,
      };
    case testConstants.TEST_CREATE_FAIL:
    case testConstants.GET_ALL_TEST_FAILURE:
    case testConstants.GET_TEST_FAILURE:
    case testConstants.EDIT_TEST_FAILURE:
    case testConstants.DELETE_TEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
