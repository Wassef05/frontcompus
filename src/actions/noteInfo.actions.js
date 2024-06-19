// actions/noteInfoActions.js
import axios from 'axios';
import { noteInfoConstants } from './constantes';

export const fetchNoteInfos = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_NOTEINFOS_REQUEST' });

        const response = await axios.get('http://localhost:8080/noteInfo/noteInfos');
        console.log('Response actions:', response.data);
        dispatch({ 
            type: 'FETCH_NOTEINFOS_SUCCESS',
            payload: { noteInfos: response.data }
        });
    } catch (error) {
        dispatch({ 
            type: 'FETCH_NOTEINFOS_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const fetchNoteInfoById = (noteInfoId) => async (dispatch) => {
    try {
        console.log(`actions Fetching noteInfo with ID: ${noteInfoId}`);
        dispatch({ type: 'FETCH_NOTEINFO_REQUEST' });

        const response = await axios.get(`http://localhost:8080/noteInfo/noteInfos/${noteInfoId}`);
        console.log('actions Response data:', response.data);
        dispatch({ 
            type: 'FETCH_NOTEINFO_SUCCESS',
            payload: { noteInfo: response.data }
        });
    } catch (error) {
        console.error('Error fetching noteInfo:', error);
        dispatch({ 
            type: 'FETCH_NOTEINFO_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const updateNoteInfoStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_NOTEINFO_REQUEST' });

        const response = await axios.put(`http://localhost:8080/noteInfo/noteInfos/${id}`, { status });
        dispatch({ 
            type: 'UPDATE_NOTEINFO_SUCCESS',
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'UPDATE_NOTEINFO_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const createNoteInfo = (noteInfoData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_NOTEINFO_REQUEST' });

        const response = await axios.post('http://localhost:8080/noteInfo/noteInfos', noteInfoData);
        dispatch({ 
            type: 'CREATE_NOTEINFO_SUCCESS',
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'CREATE_NOTEINFO_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const deleteNoteInfo = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_NOTEINFO_REQUEST' });

        await axios.delete(`http://localhost:8080/noteInfo/noteInfos/${id}`);
        dispatch({ 
            type: 'DELETE_NOTEINFO_SUCCESS',
            payload: id // Transmettez l'ID pour que le reducer puisse l'utiliser
        });
    } catch (error) {
        dispatch({ 
            type: 'DELETE_NOTEINFO_FAILURE',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const getNoteInfoCount = () => async (dispatch) => {
    try {
        dispatch({ type: noteInfoConstants.GET_NOTEINFO_COUNT_REQUEST });

        const response = await axios.get('http://localhost:8080/noteInfo/noteInfos/count'); // Remplacez par l'URL de votre endpoint
        dispatch({ 
            type: noteInfoConstants.GET_NOTEINFO_COUNT_SUCCESS,
            payload: response.data.count 
        });
    } catch (error) {
        dispatch({ 
            type: noteInfoConstants.GET_NOTEINFO_COUNT_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const resetNoteInfoCount = () => {
    return {
        type: noteInfoConstants.RESET_NOTEINFO_COUNT,
    };
};
