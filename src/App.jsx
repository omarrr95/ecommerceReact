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

        <Route path="department">
          <Route path="index" element={<Department />} />
          <Route path="add" element={<AddDepartment />} />
          <Route path="edit/:deptID" element={<AddDepartment />} />
        </Route>

        <Route path="category">
          <Route path="index" element={<Category />} />
          <Route path="add" element={<AddCategory />} />
          <Route path="edit/:catID" element={<AddCategory />} />
        </Route>

        <Route path="product">
          <Route path="index" element={<Product />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
