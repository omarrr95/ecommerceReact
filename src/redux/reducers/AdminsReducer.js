import { SET_ADMINS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  admins: null,
  loading: false,
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMINS:
      return { ...state, admins: action.admins };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default adminsReducer;
