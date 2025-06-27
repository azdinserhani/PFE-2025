import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

import { paymentRequest } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const CartSummary = ({ total, itemCount, items }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCheckout = async () => {
    try {
      const response = await paymentRequest.post("/api/payment/create-checkout-session", {
        "cartItems": items.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: 1
        }))
      }
      );

      const data = response.data;
      
      if (data.url) {
        window.location.href = data.url;
        dispatch(clearCart());
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // You might want to show a user-friendly error message here
      alert("Failed to create checkout session. Please try again.");
    }
  };
  

  return (
    <div
      className="p-6 rounded-lg shadow-md transition-all duration-300"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderTop: `4px solid ${theme.primary}`,
      }}
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: theme.text }}>
        {t("cart.summary.order_summary")}
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span style={{ color: theme.secondary }}>
            {t("cart.summary.subtotal")} ({itemCount}{" "}
            {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium" style={{ color: theme.text }}>
            {total}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: theme.secondary }}>Taxes</span>
          <span className="font-medium" style={{ color: theme.text }}>
            Calculated at checkout
          </span>
        </div>
        <div
          className="border-t pt-3 flex justify-between"
          style={{ borderColor: theme.border }}
        >
          <span className="text-lg font-bold" style={{ color: theme.text }}>
            {t("cart.summary.total")}
          </span>
          <span className="text-lg font-bold" style={{ color: theme.primary }}>
            {total}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          className="w-full text-white py-3 px-4 rounded-md font-medium transition-all hover:shadow-md duration-300"
          style={{ backgroundColor: theme.primary }}
          onClick={()=>handleCheckout()}
        >
          {t("cart.summary.checkout")}
        </button>

        <Link
          to="/courses"
          className="block w-full text-center py-3 px-4 rounded-md font-medium border transition-all hover:shadow-sm duration-300"
          style={{
            color: theme.primary,
            borderColor: theme.primary,
            backgroundColor: `${theme.primary}10`,
          }}
        >
          {t("cart.empty_cart.continue_shopping")}
        </Link>
      </div>

      <div className="mt-4 text-sm" style={{ color: theme.secondary }}>
        <p>
          By completing your purchase, you agree to our Terms of Service and
          Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
