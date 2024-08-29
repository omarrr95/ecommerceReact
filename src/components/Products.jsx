import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";
function Products() {
  const { products } = useSelector((state) => state.productsState);
  const { productUnits } = useSelector((state) => state.productUnitsState);
  console.log(products);
  console.log(productUnits);

  const loading = () => {
    return (
      <>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
        <div className="col-md-4">
          <Skeleton height={350} style={{ height: "350px" }} />
        </div>
      </>
    );
  };

  function showProducts() {
    return (
      <>
        {products?.map((el) => {
          return (
            <div className="col-12 col-md-4" key={`product-${el.id}`}>
              <ProductCard product={el} />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="products py-5 my-4 text-center">
      <h1 className="mb-5">Latest Products</h1>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <ProductsFilters />
          </div>
          <div className="col-12 col-lg-9">
            <div className="row g-3">
              {products ? showProducts() : loading()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
