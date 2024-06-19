// actions/notificationActions.js
import axios from 'axios';
import { notificationConstants } from './constantes';

export const fetchNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_NOTIFICATIONS_REQUEST' });

        const response = await axios.get('http://localhost:8080/notification/notifications');
        console.log('Response actions:', response.data);
        dispatch({ 
            type: 'FETCH_NOTIFICATIONS_SUCCESS',
            payload: { notifications: response.data }
        });
    } catch (error) {
        dispatch({ 
            type: 'FETCH_NOTIFICATIONS_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const fetchNotificationById = (notificationId) => async (dispatch) => {
    try {
        console.log(`actions Fetching notification with ID: ${notificationId}`);
        dispatch({ type: 'FETCH_NOTIFICATION_REQUEST' });

        const response = await axios.get(`http://localhost:8080/notification/notifications/${notificationId}`);
        console.log('actions Response data:', response.data);
        dispatch({ 
            type: 'FETCH_NOTIFICATION_SUCCESS',
            payload: { notification: response.data }
        });
    } catch (error) {
        console.error('Error fetching notification:', error);
        dispatch({ 
            type: 'FETCH_NOTIFICATION_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const updateNotificationStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_NOTIFICATION_REQUEST' });

        const response = await axios.put(`http://localhost:8080/notification/notifications/${id}`, { status });
        dispatch({ 
            type: 'UPDATE_NOTIFICATION_SUCCESS',
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'UPDATE_NOTIFICATION_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const createNotification = (notificationData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_NOTIFICATION_REQUEST' });

        const response = await axios.post('http://localhost:8080/notification/notifications', notificationData);
        dispatch({ 
            type: 'CREATE_NOTIFICATION_SUCCESS',
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'CREATE_NOTIFICATION_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const deleteNotification = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_NOTIFICATION_REQUEST' });

        await axios.delete(`http://localhost:8080/notification/notifications/${id}`);
        dispatch({ 
            type: 'DELETE_NOTIFICATION_SUCCESS',
            payload: id // Transmettez l'ID pour que le reducer puisse l'utiliser
        });
    } catch (error) {
        dispatch({ 
            type: 'DELETE_NOTIFICATION_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const getNotificationCount = () => async (dispatch) => {
    try {
        dispatch({ type: notificationConstants.GET_NOTIFICATION_COUNT_REQUEST });

        const response = await axios.get('http://localhost:8080/notification/notifications/count'); // Remplacez par l'URL de votre endpoint
        dispatch({ 
            type: notificationConstants.GET_NOTIFICATION_COUNT_SUCCESS,
            payload: response.data.count 
        });
    } catch (error) {
        dispatch({ 
            type: notificationConstants.GET_NOTIFICATION_COUNT_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const resetNotificationCount = () => {
    return {
        type: notificationConstants.RESET_NOTIFICATION_COUNT,
    };
};

