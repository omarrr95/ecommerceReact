import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/actions/actions";
import { decreaseQuantity, increaseQuantity } from "../redux/actions";

function CartItem({ item }) {
  const { cart } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  function clearItem(id) {
    dispatch(setCart(cart.filter((item) => item.id != id)));
  }

  return (
    <div className="row g-3 mb-5 justify-content-center align-items-center">
      <div className="col-sm-4 text-center">
        <img
          src={item?.img}
          alt="cart item"
          style={{ width: "180px", height: "150px" }}
        />
      </div>
      <div className="col-sm-8 text-center mb-5">
        <h5>{item.name}</h5>
        <p className="text-black-50" style={{ direction: "ltr" }}>
          {item?.quantity} x ${item?.price} = ${item?.quantity * item?.price}
        </p>
        <button
          className="btn btn-outline-dark me-3 border-dark"
          onClick={() => dispatch(decreaseQuantity({ cart, product: item }))}
        >
          <i className="fa fa-minus"></i>
        </button>
        <button
          className="btn btn-outline-danger mx-3 border-danger"
          onClick={() => clearItem(item.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
        <button
          className="btn btn-outline-dark border-dark"
          onClick={() => dispatch(increaseQuantity({ cart, product: item }))}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
