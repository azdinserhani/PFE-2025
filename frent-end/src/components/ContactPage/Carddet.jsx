import React from 'react'
import Concrd from './Concrd';
import { LuMapPin } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from 'framer-motion';

const Carddet = () => {
    const cardcont = [
        {
          icon: LuMapPin,
          title: "Our Location",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link: "https://maps.google.com"
        },
        {
          icon: FiPhone,
          title: "Call Us",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link: "tel:+1234567890"
        },
        {
          icon: MdOutlineEmail,
          title: "Email Us",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link: "mailto:contact@example.com"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardcont.map((contcard, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Concrd item={contcard} icon={contcard.icon} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Carddet
