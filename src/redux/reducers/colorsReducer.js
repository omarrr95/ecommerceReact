import { SET_COLORS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  colors: null,
  loading: false,
};

const colorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLORS:
      return { ...state, colors: action.colors };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default colorsReducer;
