import axios from "axios";
import * as all from "./actions";

export const baseUrl = "http://ecommerce-api.omar-work.website";

export function handleUpload(image) {
  if (!image) return;

  let time = 1000;
  let progress = 0;

  document.querySelector(".progress-bar").style.width = 0 + "%";
  document.querySelector(".progress-container").style.display = "block";

  let id = setInterval(() => {
    progress += 1;
    document.querySelector(".progress-bar").style.width = progress + "%";
    document.querySelector(".progress-text").textContent = progress + "%";
    if (progress >= 100) {
      clearInterval(id);
      document.querySelector(".progress-container").style.display = "none";
      document.querySelector(".upload-img").classList.add("active");
    }
  }, time / 100);
}

export function fetchDepartments() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/Departments`).then((res) => {
      dispatch(all.setDepartments(res.data));
    });
  };
}

export function fetchCategories() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/Categories`).then((res) => {
      dispatch(all.setCategories(res.data));
    });
  };
}

export function fetchBrands() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/Brands`).then((res) => {
      dispatch(all.setBrands(res.data));
    });
  };
}

export function fetchProducts() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/Product`).then((res) => {
      dispatch(all.setProducts(res.data));
    });
  };
}

export function fetchProductUnits() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/ProductUnit`).then((res) => {
      dispatch(all.setProductUnits(res.data));
    });
  };
}

export function fetchColors() {
  return (dispatch) => {
    axios.get(`${baseUrl}/api/Colors`).then((res) => {
      dispatch(all.setColors(res.data));
    });
  };
}

export function showData() {
  return (dispatch) => {
    dispatch(all.setLoading(true));
    Promise.all([
      axios.get(`${baseUrl}/api/Departments`),
      axios.get(`${baseUrl}/api/Categories`),
      axios.get(`${baseUrl}/api/Brands`),
      axios.get(`${baseUrl}/api/Product`),
      axios.get(`${baseUrl}/api/ProductUnit`),
      axios.get(`${baseUrl}/api/Colors`),
    ])
      .then((data) => {
        dispatch(all.setDepartments(data[0].data));
        dispatch(all.setCategories(data[1].data));
        dispatch(all.setBrands(data[2].data));
        dispatch(all.setProducts(data[3].data));
        dispatch(all.setProductUnits(data[4].data));
        dispatch(all.setColors(data[5].data));
      })
      .finally(() => dispatch(all.setLoading(false)));
  };
}
