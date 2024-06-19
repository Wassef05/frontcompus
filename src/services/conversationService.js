// /frontend/src/services/conversationService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createConversation = (userId1, userId2) => {
  return axios.post(`${API_URL}/conversations`, { userId1, userId2 });
};

const getConversations = (userId) => {
  return axios.get(`${API_URL}/conversations/${userId}`);
};

const addMessage = (conversationId, senderId, text) => {
  return axios.post(`${API_URL}/messages`, { conversationId, senderId, text });
};

const getMessages = (conversationId) => {
  return axios.get(`${API_URL}/messages/${conversationId}`);
};

export default {
  createConversation,
  getConversations,
  addMessage,
  getMessages,
};