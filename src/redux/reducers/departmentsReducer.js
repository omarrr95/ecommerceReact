import { SET_DEPARTMENTS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  departments: null,
  loading: false,
};

const departmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEPARTMENTS:
      return { ...state, departments: action.departments };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default departmentsReducer;
