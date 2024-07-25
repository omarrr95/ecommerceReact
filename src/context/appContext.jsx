import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const appContext = createContext();

function AppProvider({ children }) {
  const baseUrl = "http://ecommerce-api.omar-work.website";
  const [departments, setDepartments] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchCategories();
  }, []);

  console.log("From Context", { departments, categories });

  function fetchDepartments() {
    axios.get(`${baseUrl}/api/Departments`).then((res) => {
      setDepartments(res.data);
    });
  }

  function fetchCategories() {
    axios.get(`${baseUrl}/api/Categories`).then((res) => {
      setCategories(res.data);
    });
  }

  function handleUpload(image) {
    if (!image) return;

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
    }, 10);
  }

  return (
    <appContext.Provider
      value={{
        baseUrl,
        departments,
        categories,
        handleUpload,
        fetchDepartments,
        fetchCategories,
        setDepartments,
        setCategories,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}

export default AppProvider;
