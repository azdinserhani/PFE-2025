import React from 'react'
import Concrd from './Concrd';
import { LuMapPin } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
const Carddet = () => {
    const cardcont = [
        {
          icon: LuMapPin,
          title: "Relaxing & Learning",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link:"dsdsd"
        },
        {
          icon: FiPhone,
          title: "Relaxing & Learning",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link:"dsdsd"
        },
        {
          icon: MdOutlineEmail,
          title: "Relaxing & Learning",
          desc: "The phrasal sequence of the is now so that many campaign and benefit",
          link:"dsdsd"
        },
      ];
  return (
    <div className="flex justify-around">
        {cardcont.map((contcard) => {
          return <Concrd item={contcard} icon={contcard.icon} />;
        })}
    </div>
  )
}

export default Carddet
