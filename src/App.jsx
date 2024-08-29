import "./App.css";
import { Route, Routes } from "react-router-dom";
import Department from "./components/Department";
import AddDepartment from "./components/Department/Add";
import Category from "./components/Category";
import AddCategory from "./components/Category/Add";
import AddProduct from "./components/Product/Add";
import Brand from "./components/Brand";
import AddBrand from "./components/Brand/Add";
import Home from "./components/Home";
import { useEffect } from "react";
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
import ProductImage from "./components/ProductImage";
import AddProductImage from "./components/ProductImage/Add";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import AddAdmin from "./components/Admin/Add";
import Login from "./components/Login";
import AdminAuth from "./AdminAuth";
import Loader from "./components/Loader";
import Register from "./components/Register";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showData());
  }, []);

  return (
    <div className={`app`}>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Register />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Products />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <>
              <Header />
              <Products />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <Header />
              <ProductView />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />

        <Route path="/dashboard/department">
          <Route path="index" element={<AdminAuth child={<Department />} />} />
          <Route path="add" element={<AdminAuth child={<AddDepartment />} />} />
          <Route
            path="edit/:deptID"
            element={<AdminAuth child={<AddDepartment />} />}
          />
        </Route>

        <Route path="dashboard/category">
          <Route path="index" element={<AdminAuth child={<Category />} />} />
          <Route path="add" element={<AdminAuth child={<AddCategory />} />} />
          <Route
            path="edit/:catID"
            element={<AdminAuth child={<AddCategory />} />}
          />
        </Route>

        <Route path="dashboard/brand">
          <Route path="index" element={<AdminAuth child={<Brand />} />} />
          <Route path="add" element={<AdminAuth child={<AddBrand />} />} />
          <Route
            path="edit/:brandID"
            element={<AdminAuth child={<AddBrand />} />}
          />
        </Route>

        <Route path="dashboard/product">
          <Route path="index" element={<AdminAuth child={<Product />} />} />
          <Route path="add" element={<AdminAuth child={<AddProduct />} />} />
          <Route
            path="edit/:productID"
            element={<AdminAuth child={<AddProduct />} />}
          />
          <Route
            path="view/:productID"
            element={<AdminAuth child={<ProductImage />} />}
          />
        </Route>

        <Route path="dashboard/productUnit">
          <Route path="index" element={<AdminAuth child={<ProductUnit />} />} />
          <Route
            path="add"
            element={<AdminAuth child={<AddProductUnit />} />}
          />
          <Route
            path="edit/:unitID"
            element={<AdminAuth child={<AddProductUnit />} />}
          />
        </Route>

        <Route path="dashboard/color">
          <Route path="index" element={<AdminAuth child={<Color />} />} />
          <Route path="add" element={<AdminAuth child={<AddColor />} />} />
          <Route
            path="edit/:colorID"
            element={<AdminAuth child={<AddColor />} />}
          />
        </Route>

        <Route path="dashboard/productImage">
          <Route
            path="index"
            element={<AdminAuth child={<ProductImage />} />}
          />
          <Route
            path="add"
            element={<AdminAuth child={<AddProductImage />} />}
          />
          <Route
            path="edit/:imageID"
            element={<AdminAuth child={<AddProductImage />} />}
          />
        </Route>

        <Route path="dashboard/admin">
          <Route path="index" element={<AdminAuth child={<Admin />} />} />
          <Route path="add" element={<AdminAuth child={<AddAdmin />} />} />
          <Route
            path="edit/:adminID"
            element={<AdminAuth child={<AddAdmin />} />}
          />
        </Route>
      </Routes>

      <Loader />
    </div>
  );
}

export default App;
