import { combineReducers } from "redux";
import departmentsReducer from "./departmentsReducer";
import categoriesReducer from "./categoriesReducer";
import brandsReducer from "./brandsReducer";
import productsReducer from "./productsReducer";
import productUnitsReducer from "./productUnitsReducer";
import colorsReducer from "./colorsReducer";
import productImagesReducer from "./productImagesReducer";
import cartReducer from "./cartReducer";
import adminReducer from "./AdminReducer";
import adminsReducer from "./AdminsReducer";

const rootReducer = combineReducers({
  departmentsState: departmentsReducer,
  categoriesState: categoriesReducer,
  brandsState: brandsReducer,
  productsState: productsReducer,
  productUnitsState: productUnitsReducer,
  colorsState: colorsReducer,
  productImagesState: productImagesReducer,
  cartState: cartReducer,
  adminState: adminReducer,
  adminsState: adminsReducer,
});

export default rootReducer;
