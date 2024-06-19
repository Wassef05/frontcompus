import axios from 'axios';
import { messageConstants } from './constantes';

// Action for adding a message
export const addMessage = (formData) => async (dispatch, getState) => {
  dispatch({ type: messageConstants.ADD_MESSAGE_REQUEST });

  try {
    const { user } = getState().auth;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    // Construct the data object with the required fields
    const data = {
      sender: user._id,
      receiver: formData.receiver,
      content: formData.content,
    };

    const response = await axios.post('http://localhost:8080/app/message/create', data, config);

    dispatch({
      type: messageConstants.ADD_MESSAGE_SUCCESS,
      payload: { message: response.data },
    });

    return Promise.resolve();
  } catch (error) {
    console.error('Error adding the message:', error);
    dispatch({
      type: messageConstants.ADD_MESSAGE_FAILURE,
      payload: { error: error.response?.data.message || 'Unknown error' },
    });

    return Promise.reject(error);
  }
};

// Action for fetching messages between sender and receiver
export const getMessages = (receiverId) => async (dispatch, getState) => {
  dispatch({ type: messageConstants.GET_ALL_MESSAGE_REQUEST });

  try {
    const { user } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    const res = await axios.get(`http://localhost:8080/app/message/?receiver=${receiverId}`, config);

    dispatch({
      type: messageConstants.GET_ALL_MESSAGE_SUCCESS,
      payload: { messages: res.data },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    dispatch({
      type: messageConstants.GET_ALL_MESSAGE_FAILURE,
      payload: { error: error.response?.data.message || 'Unknown error' },
    });
  }
};
