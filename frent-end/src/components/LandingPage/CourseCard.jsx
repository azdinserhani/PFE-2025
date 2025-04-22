import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const CourseCard = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  console.log(item);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden min-w-[400px]"
    >
      <motion.img
        src={item.image || "/Info1.jpg"}
        alt={item.title}
        className="h-[151px] object-cover w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="flex gap-4 py-4 text-gray-500 font-medium text-sm">
        <span>{item.students || 0} Students</span>
        <span>{item.lessons || 0} Lessons</span>
      </div>

      <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
      <p className="text-gray-500 text-sm mt-2">{item.description}</p>
      {item.isEnrolled && (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <motion.div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${item.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-purple-600 font-bold">${item.price}</div>
        <div className="flex gap-2">
          <Link to={`/course/${item.id}`}>
            <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors">
              <span>View Details</span>
              <FaLongArrowAltRight />
            </button>
          </Link>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            <PiShoppingCartLight />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
