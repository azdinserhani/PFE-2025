import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TrustedBy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="container mx-auto flex flex-col w-full my-7">
      <h2 className="mt-10 text-center mb-7 text-2xl font-bold text-gray-500">
        Trusted By:
      </h2>
      <div className="grid grid-cols-2 mt-5 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
        {[
          { src: "/amazon.svg", alt: "Amazon" },
          { src: "/google.svg", alt: "Google" },
          { src: "/shopify.svg", alt: "Shopify" },
          { src: "/lenovo.svg", alt: "Lenovo" },
          { src: "/paypal.svg", alt: "PayPal" },
          { src: "/spotify.svg", alt: "Spotify" },
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
