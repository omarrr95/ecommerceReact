import { SET_ADMIN, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  admin: null,
  loading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return { ...state, admin: action.admin };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default adminReducer;
