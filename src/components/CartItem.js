import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, toggleIncAndDec } from "../features/Cart/CartSlice";
import { ChevronDown, ChevronUp } from "../icons";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleIncAndDec({ id, sign: "plus" }))}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(toggleIncAndDec({ id, sign: "minus" }));
          }}
          disabled={amount === 1}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
