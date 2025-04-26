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
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 pt-20 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-8">
            <h3 className="font-bold text-2xl text-white relative inline-block">
              Logo
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left transition-all duration-300 ease-out"></span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Discover a world of knowledge and opportunities with our online
              education platform pursue a new career.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg group-hover:bg-purple-600/90 transition-all duration-300 shadow-lg">
                  <FaLocationDot className="size-5" />
                </div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                  Ksar el Kebir
                </span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg group-hover:bg-purple-600/90 transition-all duration-300 shadow-lg">
                  <FaPhoneVolume className="size-5" />
                </div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                  +212636241246
                </span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-8">
            <h3 className="font-bold text-xl text-white relative inline-block">
              Useful Links
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left transition-all duration-300 ease-out"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-gray-300">
              {[
                "Course",
                "Mission & Vision",
                "Join a Career",
                "Zoom Meeting",
                "Pricing Plan",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="h-[2px] w-0 group-hover:w-4 bg-purple-500 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Institute */}
          <div className="space-y-8">
            <h3 className="font-bold text-xl text-white relative inline-block">
              Our Institute
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left transition-all duration-300 ease-out"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-gray-300">
              {[
                "Contact Us",
                "Mission & Vision",
                "Technology",
                "Instructors",
                "Pricing",
                "Services",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="h-[2px] w-0 group-hover:w-4 bg-purple-500 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-8">
            <h3 className="font-bold text-xl text-white relative inline-block">
              Get In Touch
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left transition-all duration-300 ease-out"></span>
            </h3>
            <div className="flex flex-col gap-5 mb-8">
              <a
                href="#"
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-lg"
              >
                <img
                  src="/AppStore.png"
                  alt="App Store"
                  className="rounded-xl shadow-md"
                />
              </a>
              <a
                href="#"
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-lg"
              >
                <img
                  src="/PlayStore.png"
                  alt="Play Store"
                  className="rounded-xl shadow-md"
                />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <CiLinkedin className="text-xl" />, label: "LinkedIn" },
                { icon: <LuFacebook className="text-xl" />, label: "Facebook" },
                {
                  icon: <FaInstagram className="text-xl" />,
                  label: "Instagram",
                },
                { icon: <CiTwitter className="text-xl" />, label: "Twitter" },
                {
                  icon: <MdOutlineEmail className="text-xl" />,
                  label: "Email",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg hover:bg-purple-600/90 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/60 my-12"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
