import { classeConstants } from '../actions/constantes';

const initialState = {
    loading: false,
    classes: [],
    error: null,
    // Ajoutez d'autres états au besoin
};

export function classeReducer(state = initialState, action) {
    switch (action.type) {
        case classeConstants.CREATE_CLASSE_REQUEST:
            return { ...state, loading: true };
        case classeConstants.CREATE_CLASSE_SUCCESS:
            return { ...state, loading: false, classes: [...state.classes, action.payload], error: null };
        case classeConstants.CREATE_CLASSE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // Gérez d'autres cas d'action
        default:
            return state;
    }
}
