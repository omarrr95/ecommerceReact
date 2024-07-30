import { SET_CATEGORIES, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  categories: null,
  loading: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };

    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
