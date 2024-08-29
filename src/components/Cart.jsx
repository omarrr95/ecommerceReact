import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const { cart } = useSelector((state) => state.cartState);

  let totalPrice = cart.reduce((result, item) => {
    return result + item.quantity * item.price;
  }, 0);

  return (
    <div className="cart py-4 bg-white">
      <div className="container">
        <h1 className="text-center mb-5">
          {cart.length == 0 ? "Cart is Empty" : "Cart"}
        </h1>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        <h2 className="border-top py-4 text-center">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default Cart;
