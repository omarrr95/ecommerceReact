import "./ProductView.css";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductsFilters from "./ProductsFilters";
import { decreaseQuantity, increaseQuantity } from "../redux/actions";

function ProductView() {
  const { id } = useParams();
  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { products } = useSelector((state) => state.productsState);
  const { categories } = useSelector((state) => state.categoriesState);
  const { productImages } = useSelector((state) => state.productImagesState);
  const { cart } = useSelector((state) => state.cartState);
  const product = products?.find((product) => product.id == id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function selectImage(e) {
    document.querySelector(".mainImage img").src = e.target.src;
    document.querySelector(".thumbnail img.active").classList.remove("active");
    e.target.classList.add("active");
  }

  function handleMouseMove(e) {
    const containerWidth = e.target.parentElement.offsetWidth;
    const containerHeight = e.target.parentElement.offsetHeight;
    const scale = 3;
    const x = e.pageX - e.target.parentElement.offsetLeft;
    const y = e.pageY - e.target.parentElement.offsetTop;
    const translateX = (containerWidth / 2 - x) * 2;
    const translateY = (containerHeight / 2 - y) * 2;

    e.target.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

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
    if (!product) return;

    return (
      <>
        {/* <div className="col-12 col-lg-3">
          <ProductsFilters />
        </div> */}
        <div className="col-12 col-lg-7">
          <div className="wrapper border flex-column-reverse flex-md-row">
            <section className="thumbnail">
              <div className="thumbnailBox">
                <img
                  onClick={selectImage}
                  src={product.img}
                  className="active border"
                />
              </div>

              {productImages
                .filter((el) => el.productId == product.id)
                ?.map((el) => (
                  <div key={el.id} className="thumbnailBox">
                    <img
                      src={el.images}
                      className="border"
                      onClick={selectImage}
                    />
                  </div>
                ))}
            </section>

            <section className="mainImage">
              <img
                src={product.img}
                className="active border"
                onMouseMove={handleMouseMove}
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translate(0%, 0%) scale(1)")
                }
              />
            </section>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="content p-2">
            <h3 className="title ">{product.name}</h3>
            <h4 className="text-muted mb-3">
              {categories?.find((cat) => cat.id == product.categoriesId).name}
            </h4>

            <h5 className="price text-secondary">
              ${product.price} &nbsp;{" "}
              {product.hasDiscount && <del>${product.priceBeforeDiscount}</del>}
            </h5>
            <div className="rating my-3">
              <i className="fa fa-star yellow"></i>
              <i className="fa fa-star yellow"></i>
              <i className="fa fa-star yellow"></i>
              <i className="fa fa-star yellow"></i>
              <i className="fa fa-star grey"></i>
              <span> | 900 Ratings</span>
            </div>
            <p
              className="description text-secondary"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
          </div>
          <div className="cart-btns justify-content-center justify-content-lg-start">
            <div className="btns-group">
              <button
                className="plus"
                onClick={() => dispatch(increaseQuantity({ cart, product }))}
              >
                +
              </button>
              <span>
                {cart?.find((item) => item.id == product.id)?.quantity || 0}
              </span>
              <button
                className="minus"
                onClick={() => dispatch(decreaseQuantity({ cart, product }))}
              >
                -
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="product-view py-4">
      <div className="container">
        <div className="row g-3 align-items-start text-center text-lg-start">
          {loading ? <Loading /> : showProducts()}
        </div>
      </div>
    </div>
  );
}

export default ProductView;
