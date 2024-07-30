import * as types from "./actionTypes";

export const setLoading = (payload) => {
  return {
    type: types.SET_LOADING,
    loading: payload,
  };
};

export const setDepartments = (payload) => {
  return {
    type: types.SET_DEPARTMENTS,
    departments: payload,
  };
};

export const setCategories = (payload) => {
  return {
    type: types.SET_CATEGORIES,
    categories: payload,
  };
};

export const setBrands = (payload) => {
  return {
    type: types.SET_BRANDS,
    brands: payload,
  };
};

export const setProducts = (payload) => {
  return {
    type: types.SET_PRODUCTS,
    products: payload,
  };
};

export const setProductUnits = (payload) => {
  return {
    type: types.SET_PRODUCT_UNITS,
    productUnits: payload,
  };
};

export const setColors = (payload) => {
  return {
    type: types.SET_COLORS,
    colors: payload,
  };
};
