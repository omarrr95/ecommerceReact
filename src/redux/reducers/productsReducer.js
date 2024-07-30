import { SET_LOADING, SET_PRODUCTS } from "../actions/actionTypes";

const initialState = {
  products: null,
  loading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default productsReducer;
