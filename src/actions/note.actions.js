import axios from 'axios';
import { noteConstants } from './constantes';


export const addNote = (noteData, userId) => {
    return async (dispatch) => {
        // Vérification si userId est défini
        if (!userId) {
            console.error("L'ID de l'utilisateur n'est pas fourni");
            dispatch({
                type: noteConstants.ADD_NOTE_FAILURE,
                payload: { erreur: "L'ID de l'utilisateur n'est pas fourni" }
            });
            return;
        }

        dispatch({ type: noteConstants.ADD_NOTE_REQUEST });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Ajout de l'ID de l'utilisateur aux données de la note
            const notePayload = { ...noteData, user: userId };

            console.log("Note data being sent:", notePayload);

            // Remplacez l'URL par votre URL de l'API de backend
            const res = await axios.post(`http://localhost:8080/note/note/new`, notePayload, config);

            dispatch({
                type: noteConstants.ADD_NOTE_SUCCESS,
                payload: { note: res.data }
            });
        } catch (erreur) {
            console.error("Error from backend:", erreur);
            dispatch({
                type: noteConstants.ADD_NOTE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};








// Action pour éditer une note

export const getNotesByUser = (userId) => {
    return async dispatch => {
        dispatch({ type: noteConstants.GET_NOTES_BY_USER_REQUEST });
        try {
            const res = await axios.get(`http://localhost:8080/note/notestest/user/${userId}`);
            if (res.status === 200) {
                dispatch({ 
                    type: noteConstants.GET_NOTES_BY_USER_SUCCESS, 
                    payload: { notes: res.data }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: noteConstants.GET_NOTES_BY_USER_FAILURE, 
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};


export const getNote = (id) => {
    return async dispatch => {
        dispatch({ type: noteConstants.GET_NOTE_REQUEST });
        try {
            
            const res = await axios.get(`http://localhost:8080/note/note/${id}`);
            if (res.status === 200) {
                dispatch({ 
                    type: noteConstants.GET_NOTE_SUCCESS, 
                    payload: { note: res.data }
                });
            }
        } catch (erreur) {
            dispatch({ 
                type: noteConstants.GET_NOTE_FAILURE, 
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};


export const editNote = (id, noteData) => {
    return async dispatch => {
        dispatch({ type: noteConstants.EDIT_NOTE_REQUEST });
        try {
            const res = await axios.put(`http://localhost:8080/note/note/update/${id}`, noteData); 
            if (res.status === 200) {
                dispatch({
                    type: noteConstants.EDIT_NOTE_SUCCESS,
                    payload: { note: res.data }
                });
            }
        } catch (erreur) {
            dispatch({
                type: noteConstants.EDIT_NOTE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};
// Action pour supprimer une note
export const deleteNote = (id) => {
    return async dispatch => {
        dispatch({ type: noteConstants.DELETE_NOTE_REQUEST });
        try {
            const res = await axios.delete(`http://localhost:8080/note/note/delete/${id}`);
            if (res.status === 200) {
                dispatch({
                    type: noteConstants.DELETE_NOTE_SUCCESS,
                    payload: { id }
                });
            }
        } catch (erreur) {
            dispatch({
                type: noteConstants.DELETE_NOTE_FAILURE,
                payload: { erreur: erreur.response?.data.message || "Erreur inconnue" }
            });
        }
    };
};
