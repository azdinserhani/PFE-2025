import React from 'react'
import Concrd from './Concrd';
import { LuMapPin } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Carddet = () => {
    const { themes, currentTheme } = useTheme();
    const theme = themes[currentTheme];

    const cardcont = [
        {
          icon: LuMapPin,
          title: "Our Location",
          desc: "Visit our headquarters to meet our team in person and discuss your educational needs.",
          link: "https://maps.google.com"
        },
        {
          icon: FiPhone,
          title: "Call Us",
          desc: "Have a quick question? Give us a call and our support team will assist you promptly.",
          link: "tel:+1234567890"
        },
        {
          icon: MdOutlineEmail,
          title: "Email Us",
          desc: "Send us a detailed message about your inquiry and we'll respond within 24 hours.",
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

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.section 
            className="py-16 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ backgroundColor: theme.background }}
        >
            <div className="max-w-5xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 
                        className="text-3xl font-bold mb-3"
                        style={{ color: theme.text }}
                    >
                        Get in Touch
                    </h2>
                    <div 
                        className="w-20 h-1 mx-auto mb-4"
                        style={{ backgroundColor: theme.primary }}
                    ></div>
                    <p 
                        className="max-w-2xl mx-auto"
                        style={{ color: `${theme.text}99` }}
                    >
                        We're here to help and answer any questions you might have about our courses and services
                    </p>
                </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {cardcont.map((contcard, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                        style={{ 
                            backgroundColor: theme.cardBg, 
                            borderColor: theme.border,
                            borderWidth: '1px'
                        }}
                    >
                        <Concrd item={contcard} icon={contcard.icon} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

export default Carddet
