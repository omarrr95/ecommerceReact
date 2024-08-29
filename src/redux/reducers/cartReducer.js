import { SET_CART, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  cart: [],
  loading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default cartReducer;
