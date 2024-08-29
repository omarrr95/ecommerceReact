import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseQuantity } from "../redux/actions";

function ProductCard({ product, isView = false }) {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cartState);
  const { categories } = useSelector((state) => state.categoriesState);
  const { productUnits } = useSelector((state) => state.productUnitsState);
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div className="image">
        <img
          src={product.img}
          alt="product"
          className="productImage w-100"
          onClick={() => navigate("/products/" + product.id)}
        />
        <ul className="actions d-flex gap-2 justify-content-center">
          <li onClick={() => navigate(`/products/${product.id}`)}>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </li>
          <li onClick={() => dispatch(increaseQuantity({ cart, product }))}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </li>
          <li>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
      <div className="content bg-white">
        <div className="category d-flex justify-content-between gap-2">
          <span>
            {categories.find((cat) => cat.id == product.categoriesId).name}
          </span>
          <div className="rate">
            <i className="fa fa-star yellow"></i>
            <i className="fa fa-star yellow"></i>
            <i className="fa fa-star yellow"></i>
            <i className="fa fa-star yellow"></i>
            <i className="fa fa-star grey"></i>
          </div>
        </div>
        <h6
          className="title my-2 fw-bold"
          title={product.name}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h6>
        <div className="pricing d-flex justify-content-between gap-2">
          <h6 className="price">
            ${product.price} &nbsp;{" "}
            {product.hasDiscount && <del>${product.priceBeforeDiscount}</del>}
          </h6>
          <h6>
            {productUnits?.find((unit) => unit.productId == product.id)?.name}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
