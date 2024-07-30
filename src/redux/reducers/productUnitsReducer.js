import {
  SET_LOADING,
  SET_PRODUCT_UNITS,
  SET_PRODUCTS,
} from "../actions/actionTypes";

const initialState = {
  productUnits: null,
  loading: false,
};

// {
//     type: types.SET_PRODUCT_UNITS,
//     productUnits: payload,
// };

const productUnitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_UNITS:
      return { ...state, productUnits: action.productUnits };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default productUnitsReducer;
