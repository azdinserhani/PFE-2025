import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import EmptyCart from "../components/Cart/EmptyCart";
import CartActions from "../components/Cart/CartActions";
import {
  removeFromCart,
  clearCart,
} from "../redux/features/cartSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveFromCart = (courseId) => {
    if (courseId) {
      dispatch(removeFromCart(courseId));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const itemCount = items?.length || 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {t("cart.actions.shopping_cart")}
      </h1>

      {itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartActions onClearCart={handleClearCart} itemCount={itemCount} />

            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveFromCart(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary total={total} itemCount={itemCount} items={items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
