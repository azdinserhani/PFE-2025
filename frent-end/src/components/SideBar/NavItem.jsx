import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { motion } from "framer-motion";

const NavItem = ({
  icon: Icon,
  label,
  open,
  menuItems = [],
  onClick,
  theme,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasMenu = menuItems.length > 0;

  return (
    <motion.li
      className="flex flex-col duration-300"
      onClick={onClick}
      style={{ color: "inherit" }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`flex items-center gap-4 cursor-pointer ${
          open && "w-50"
        } relative peer px-3.5 py-2 rounded-md`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          backgroundColor: `${theme.primary}15`,
          x: 3,
        }}
        animate={{
          backgroundColor: isHovered ? `${theme.primary}15` : "transparent",
          color: isHovered ? theme.primary : "inherit",
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="flex items-center gap-4 flex-grow"
          animate={{
            color: isHovered ? theme.primary : "inherit",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon fontSize={20} />
          </motion.div>
          {open && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.li>
  );
};

export default NavItem;
