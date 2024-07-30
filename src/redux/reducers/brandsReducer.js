import { SET_BRANDS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  brands: null,
  loading: false,
};

const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANDS:
      return { ...state, brands: action.brands };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default brandsReducer;
