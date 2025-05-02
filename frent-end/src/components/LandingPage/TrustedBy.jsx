import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
const TrustedBy = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div
      ref={ref}
      className="container mx-auto flex flex-col w-full my-7"
      style={{ backgroundColor: theme.background }}
    >
      <h2
        className="mt-10 text-center mb-7 text-2xl font-bold"
        style={{ color: theme.secondary }}
      >
        {t("trusted_by.trusted_by")}
      </h2>
      <div className="grid grid-cols-2 mt-5 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
        {[
          { src: "/amazon.svg", alt: t("alt_text.company_logos.amazon") },
          { src: "/google.svg", alt: t("alt_text.company_logos.google") },
          { src: "/shopify.svg", alt: t("alt_text.company_logos.shopify") },
          { src: "/lenovo.svg", alt: t("alt_text.company_logos.lenovo") },
          { src: "/paypal.svg", alt: t("alt_text.company_logos.paypal") },
          { src: "/spotify.svg", alt: t("alt_text.company_logos.spotify") },
        ].map((item, index) => {
          return (
            <motion.img
              key={index}
              src={item.src}
              alt={item.alt}
              className="w-20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.2,
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrustedBy;
