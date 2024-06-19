// import { messageConstants } from '../actions/constantes';

// const initialState = {
//     loading: false,
//     messages: [],
//     error: null,
// };

// export const messageReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case messageConstants.GET_MESSAGES_REQUEST:
//         case messageConstants.SEND_MESSAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case messageConstants.GET_MESSAGES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 messages: action.payload,
//             };
//         case messageConstants.SEND_MESSAGE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//             };
//         case messageConstants.GET_MESSAGES_FAILURE:
//         case messageConstants.SEND_MESSAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };
import { messageConstants } from '../actions/constantes';

const initialState = {
  loading: false,
  messages: [],
  error: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageConstants.GET_ALL_MESSAGE_REQUEST:
    case messageConstants.ADD_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case messageConstants.GET_ALL_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
      };
    case messageConstants.ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload.message],
      };
    case messageConstants.GET_ALL_MESSAGE_FAILURE:
    case messageConstants.ADD_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

