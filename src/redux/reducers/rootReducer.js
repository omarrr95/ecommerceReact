import { combineReducers } from "redux";
import departmentsReducer from "./departmentsReducer";
import categoriesReducer from "./categoriesReducer";
import brandsReducer from "./brandsReducer";
import productsReducer from "./productsReducer";
import productUnitsReducer from "./productUnitsReducer";
import colorsReducer from "./colorsReducer";

const rootReducer = combineReducers({
  departmentsState: departmentsReducer,
  categoriesState: categoriesReducer,
  brandsState: brandsReducer,
  productsState: productsReducer,
  productUnitsState: productUnitsReducer,
  colorsState: colorsReducer,
});

export default rootReducer;
