import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
    setProducts(data);
  }

  const loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} style={{ height: "350px" }} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} style={{ height: "350px" }} />
        </div>
      </>
    );
  };

  function showProducts() {
    return (
      <>
        {products.map((el) => {
          return (
            <div key={el.id} className="col-md-4 col-lg-3">
              <div className="card p-4">
                <img
                  src={el.image}
                  className="card-img-top"
                  alt="image text"
                  loading="lazy"
                  style={{ height: "250px" }}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    title={el.title}
                    style={{ minHeight: "50px" }}
                  >
                    ...{el.title.slice(0, 15)}
                  </h5>
                  <p className="card-text fs-4 fw-bold">${el.price}</p>
                  <Link
                    to={`/products/${el.id}`}
                    className="btn btn-outline-dark border border-dark"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // const showButtons = () => {
  //   return (
  //     <>
  //       {categories.length == 0 ? (
  //         <p className="mb-5 pb-5">Loading...</p>
  //       ) : (
  //         <div className="buttons d-flex flex-wrap justify-content-center gap-3 mb-5 pb-5">
  //           <button
  //             className="btn btn-outline-dark"
  //             onClick={() => getProducts()}
  //           >
  //             ALL
  //           </button>
  //           {categories.map((el, i) => (
  //             <button
  //               key={i}
  //               className="btn btn-outline-dark"
  //               onClick={() => getProductsInCategories(el)}
  //             >
  //               {el.toUpperCase()}
  //             </button>
  //           ))}
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <div className="products py-5 my-4 text-center">
      <div className="container">
        <h1 className="mb-5">Latest Products</h1>
        {/* {showButtons()} */}
        <div className="row g-4">
          {products.length == 0 ? loading() : showProducts()}
        </div>
      </div>
    </div>
  );
}

export default Products;
