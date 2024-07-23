import { Route, Routes } from "react-router-dom";
import "./App.css";
import Department from "./components/Department";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddDepartment from "./components/Department/Add";
import Category from "./components/Category";
import AddCategory from "./components/Category/Add";
import Product from "./components/Product";
import AddProduct from "./components/Product/Add";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<h1 className="body-content">Home</h1>} />

        <Route path="/department/index" element={<Department />} />
        <Route path="/department/add" element={<AddDepartment />} />
        <Route path="/department/edit/:deptID" element={<AddDepartment />} />
        <Route path="/category/index" element={<Category />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/add/:catID" element={<AddCategory />} />
        <Route path="/product/index" element={<Product />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
