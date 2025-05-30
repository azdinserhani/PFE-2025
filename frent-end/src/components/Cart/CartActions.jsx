import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const CartActions = ({ onClearCart, itemCount }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg mb-6 shadow-sm transition-all duration-300"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderLeft: `4px solid ${theme.primary}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${theme.primary}20` }}
        >
          <FaShoppingCart style={{ color: theme.primary }} />
        </div>
        <div>
          <h3 className="text-lg font-medium" style={{ color: theme.text }}>
            {t("cart.actions.shopping_cart")}
          </h3>
          <p style={{ color: theme.secondary }}>
            {itemCount}{" "}
            {itemCount === 1
              ? `${t("cart.summary.item")}`
              : `${t("cart.summary.items")}`}{" "}
            {t("cart.actions.items_in_cart")}
          </p>
        </div>
      </div>

      {itemCount > 0 && (
        <button
          onClick={onClearCart}
          className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:shadow-sm"
          style={{
            color: "#f44336",
            backgroundColor: "rgba(244, 67, 54, 0.08)",
            border: "1px solid rgba(244, 67, 54, 0.2)",
          }}
        >
          <FaTrash />
          <span>{t("cart.actions.clear_cart")}</span>
        </button>
      )}
    </div>
  );
};

export default CartActions;
