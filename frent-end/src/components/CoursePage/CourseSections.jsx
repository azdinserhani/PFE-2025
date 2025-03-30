import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function CourseSections() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col p-6 bg-white w-full max-w-md border border-gray-200 rounded-2xl shadow-lg">
      <motion.div
        className="flex justify-between items-center p-4 border-b border-gray-200 font-semibold text-gray-800 cursor-pointer"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-1.5">
          <motion.div
          className="text-gray-500"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
        <span className="text-lg">Title</span>
        </div>
        
        <span className="flex items-center gap-2 text-sm text-gray-500">
          2 hrs
        </span>
      </motion.div>
      <motion.div
        className={`overflow-hidden`}
        initial={{ maxHeight: 0 }}
        animate={{ maxHeight: open ? "1000px" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-3 pl-8 flex justify-between items-center border-b border-gray-200 text-gray-600 text-sm"
          >
            <span>Learn the basics</span>
            <span>30 min</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
