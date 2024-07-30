import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
    setLoading(false);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-6 px-3">
          <Skeleton height={450} />
        </div>
        <div className="col-md-6 " style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <div className="d-flex ">
            <Skeleton height={50} width={100} />
            <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
          </div>
        </div>
      </>
    );
  };

  const showProducts = () => {
    return (
      <>
        <div className="col-md-6 px-3 ">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ width: "400px", height: "400px" }}
          />
        </div>
        <div className="col-md-6 ">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h2 className="display-6">{product.title}</h2>
          <div className="fs-4">
            Rating: {product.rating && product.rating.rate}
            <i className="ms-1 fa fa-star"></i>
          </div>
          <h3 className="display-6 fw-bold my-3">${product.price}</h3>
          <p className="lead my-3">{product.description}</p>
          <button className="btn btn-outline-dark mx-2">Add to Cart</button>
          <Link to="/cart" className="btn btn-dark">
            Go to Cart
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="product py-5 bg-white">
      <div className="container">
        <div className="row g-3 align-items-center text-center text-md-start">
          {loading ? <Loading /> : showProducts()}
        </div>
      </div>
    </div>
  );
}

export default ProductView;
