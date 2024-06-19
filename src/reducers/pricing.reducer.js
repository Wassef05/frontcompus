import { priceConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    prices: [],
    error: null,
    priceDetail: {}
};

export const priceReducer = (state = initialState, action) => {
    switch (action.type) {
        case priceConstants.CREATE_PRICE_REQUEST:
        case priceConstants.GET_ALL_PRICES_REQUEST:
        case priceConstants.GET_PRICE_REQUEST:
        case priceConstants.UPDATE_PRICE_REQUEST:
        case priceConstants.DELETE_PRICE_REQUEST:
       
            return {
                ...state,
                loading: true,
                error: null
            };
        case priceConstants.CREATE_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                prices: [...state.prices, action.payload.price]
            };
        case priceConstants.GET_ALL_PRICES_SUCCESS:
            return {
                ...state,
                loading: false,
                prices: action.payload.prices
            };
        case priceConstants.GET_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                priceDetail: action.payload.price
            };
        case priceConstants.UPDATE_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                prices: state.prices.map(price => 
                    price._id === action.payload.price._id ? action.payload.price : price
                )
            };
        case priceConstants.DELETE_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                prices: state.prices.filter(price => price._id !== action.payload.priceId)
            };
      
            
        case priceConstants.CREATE_PRICE_FAILURE:
        case priceConstants.GET_ALL_PRICES_FAILURE:
        case priceConstants.GET_PRICE_FAILURE:
        case priceConstants.UPDATE_PRICE_FAILURE:
        case priceConstants.DELETE_PRICE_FAILURE:
       
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
