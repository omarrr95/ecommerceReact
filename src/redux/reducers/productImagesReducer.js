import { SET_LOADING, SET_PRODUCT_IMAGES } from "../actions/actionTypes";

const initialState = {
  productImages: null,
  loading: false,
};

const productImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_IMAGES:
      return { ...state, productImages: action.productImages };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default productImagesReducer;
