import { useState } from "react";
import { motion } from "framer-motion";

const NavItem = ({ icon: Icon, label, open, onClick, theme, isRTL }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className="flex flex-col duration-300"
      onClick={onClick}
      style={{ color: "inherit" }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`flex items-center gap-4 cursor-pointer relative peer px-3.5 py-2 rounded-md ${
          !open && "justify-center"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          backgroundColor: `${theme.primary}15`,
          x: isRTL ? -3 : 3,
        }}
        animate={{
          backgroundColor: isHovered ? `${theme.primary}15` : "transparent",
          color: isHovered ? theme.primary : "inherit",
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="flex items-center gap-4 flex-grow"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          animate={{
            color: isHovered ? theme.primary : "inherit",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: isRTL ? -5 : 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon fontSize={20} />
          </motion.div>
          {open && (
            <motion.span
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {!open && isHovered && (
        <motion.div
          className={`fixed ${isRTL ? 'right-14' : 'left-14'} px-2 py-1 rounded-md text-sm font-medium z-50`}
          initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
          style={{
            backgroundColor: theme.cardBg,
            color: theme.text,
            boxShadow: `0 2px 8px ${theme.primary}20`,
            border: `1px solid ${theme.border}`,
          }}
        >
          {label}
        </motion.div>
      )}
    </motion.li>
  );
};

export default NavItem;
