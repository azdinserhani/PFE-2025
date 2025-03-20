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
    <div className=" bg-gray-900 text-white p-10">
      <div className="container mx-auto flex gap-10">
        <div>
          <span className="font-bold">Logo</span>
          <p className="text-gray-400 mt-5">
            Discover a world of knowledge and opportunities with our online
            education platform pursue a new career.
          </p>
          <div className="flex">
            <span className="flex gap-5 mt-5 items-center font-bold">
              <FaLocationDot className="size-6" color="#8f15f5" /> Ksar el Kebir
            </span>
          </div>
          <div>
            <span className="flex gap-5 mt-5 items-center font-bold">
              <FaPhoneVolume className="size-5.5" color="#8f15f5" />
              +212636241246
            </span>
          </div>
        </div>
        <div className="flex-1/2">
          <span className="font-bold">Useful Links</span>
          <ul className="flex flex-col gap-3  text-gray-400">
            <li>
              <a href="" className="hover:text-purple-600 duration-300 ">
                Course
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300  ">
                Mission & Vision
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300  ">
                Join a Career
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300 ">
                Zoom Meeting
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300 ">
                Pricing Plan
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1/2">
          <span className="font-bold">Our Institute</span>
          <ul className="flex flex-col gap-3  text-gray-400">
            <li>
              <a href="" className="hover:text-purple-600 duration-300 ">
                Contact Us
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300  ">
                Mission & Vision
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                Technology
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                Instructors
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                Services
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">Get In Touch</span>
          <div className="flex flex-col gap-5 mb-5">
            <a href="">
              <img src="/AppStore.png" alt="" />
            </a>
            <a href="">
              <img src="/PlayStore.png" alt="" />
            </a>
          </div>
          <ul className="flex justify-center items-center gap-3 text-2xl">
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                <CiLinkedin />
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                <LuFacebook />
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                <CiTwitter />
              </a>
            </li>
            <li>
              <a href="" className="hover:text-purple-600 duration-300">
                <MdOutlineEmail />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
