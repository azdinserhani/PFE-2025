import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-2xl text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-purple-600 after:left-0 after:-bottom-2">
              Logo
            </h3>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Discover a world of knowledge and opportunities with our online
              education platform pursue a new career.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="bg-gray-800 p-3 rounded-full group-hover:bg-purple-600 transition-colors duration-300">
                  <FaLocationDot className="size-5" color="#fff" />
                </div>
                <span className="font-medium">Ksar el Kebir</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="bg-gray-800 p-3 rounded-full group-hover:bg-purple-600 transition-colors duration-300">
                  <FaPhoneVolume className="size-5" color="#fff" />
                </div>
                <span className="font-medium">+212636241246</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-purple-600 after:left-0 after:-bottom-2">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-3 text-gray-400">
              {["Course", "Mission & Vision", "Join a Career", "Zoom Meeting", "Pricing Plan"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Institute */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-purple-600 after:left-0 after:-bottom-2">
              Our Institute
            </h3>
            <ul className="flex flex-col gap-3 text-gray-400">
              {["Contact Us", "Mission & Vision", "Technology", "Instructors", "Pricing", "Services"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-purple-600 after:left-0 after:-bottom-2">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-5 mb-5">
              <a 
                href="#" 
                className="transform hover:scale-105 transition-transform duration-300 inline-block"
              >
                <img src="/AppStore.png" alt="App Store" className="rounded-lg shadow-md" />
              </a>
              <a 
                href="#" 
                className="transform hover:scale-105 transition-transform duration-300 inline-block"
              >
                <img src="/PlayStore.png" alt="Play Store" className="rounded-lg shadow-md" />
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <CiLinkedin />, label: "LinkedIn" },
                { icon: <LuFacebook />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <CiTwitter />, label: "Twitter" },
                { icon: <MdOutlineEmail />, label: "Email" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="bg-gray-800 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
