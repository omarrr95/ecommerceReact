import "./App.css";
import { Route, Routes } from "react-router-dom";
import Department from "./components/Department";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddDepartment from "./components/Department/Add";
import Category from "./components/Category";
import AddCategory from "./components/Category/Add";
import AddProduct from "./components/Product/Add";
import Brand from "./components/Brand";
import AddBrand from "./components/Brand/Add";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductView from "./components/ProductView";
import Product from "./components/Product";
import { useDispatch } from "react-redux";
import { showData } from "./redux/actions";
import AddProductUnit from "./components/ProductUnit/Add";
import ProductUnit from "./components/ProductUnit";
import Color from "./components/Color";
import AddColor from "./components/Color/Add";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showData());
  }, []);

  return (
    <div className={`app ${isAdmin && "admin-layout"}`}>
      {isAdmin ? (
        <>
          <Navbar />
          <Sidebar />
        </>
      ) : (
        <Header />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
            </>
          }
        />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductView />} />

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

        <Route path="brand">
          <Route path="index" element={<Brand />} />
          <Route path="add" element={<AddBrand />} />
          <Route path="edit/:brandID" element={<AddBrand />} />
        </Route>

        <Route path="product">
          <Route path="index" element={<Product />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:productID" element={<AddProduct />} />
        </Route>

        <Route path="productUnit">
          <Route path="index" element={<ProductUnit />} />
          <Route path="add" element={<AddProductUnit />} />
          <Route path="edit/:unitID" element={<AddProductUnit />} />
        </Route>

        <Route path="color">
          <Route path="index" element={<Color />} />
          <Route path="add" element={<AddColor />} />
          <Route path="edit/:colorID" element={<AddColor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
