// src/actions/priceActions.js
import axios from 'axios';
import { priceConstants } from './constantes';

export const addPrice = (priceData) => async (dispatch) => {
  dispatch({ type: priceConstants.CREATE_PRICE_REQUEST });
  try {
    const res = await axios.post(`http://localhost:8080/pricing/pricing/new`, priceData);
    dispatch({
      type: priceConstants.CREATE_PRICE_SUCCESS,
      payload: { price: res.data }
    });
  } catch (error) {
    dispatch({
      type: priceConstants.CREATE_PRICE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getAllPrices = () => async (dispatch) => {
  dispatch({ type: priceConstants.GET_ALL_PRICES_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/pricing/pricings`);
    dispatch({
      type: priceConstants.GET_ALL_PRICES_SUCCESS,
      payload: { prices: res.data }
    });
  } catch (error) {
    dispatch({
      type: priceConstants.GET_ALL_PRICES_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const getPrice = (priceId) => async (dispatch) => {
  dispatch({ type: priceConstants.GET_PRICE_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/price/price/${priceId}`);
    dispatch({
      type: priceConstants.GET_PRICE_SUCCESS,
      payload: { price: res.data }
    });
  } catch (error) {
    dispatch({
      type: priceConstants.GET_PRICE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const editPrice = (priceId, priceData) => async (dispatch) => {
  dispatch({ type: priceConstants.UPDATE_PRICE_REQUEST });
  try {
    const res = await axios.put(`http://localhost:8080/price/price/update/${priceId}`, priceData);
    dispatch({
      type: priceConstants.UPDATE_PRICE_SUCCESS,
      payload: { price: res.data }
    });
  } catch (error) {
    dispatch({
      type: priceConstants.UPDATE_PRICE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};

export const deletePrice = (priceId) => async (dispatch) => {
  dispatch({ type: priceConstants.DELETE_PRICE_REQUEST });
  try {
    await axios.delete(`http://localhost:8080/price/price/delete/${priceId}`);
    dispatch({
      type: priceConstants.DELETE_PRICE_SUCCESS,
      payload: { priceId }
    });
  } catch (error) {
    dispatch({
      type: priceConstants.DELETE_PRICE_FAILURE,
      payload: { error: error.response?.data.message || "Erreur inconnue" }
    });
  }
};
