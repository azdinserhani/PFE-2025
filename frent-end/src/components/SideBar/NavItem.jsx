import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";


const NavItem = ({ icon: Icon, label, open, menuItems = [], onClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hasMenu = menuItems.length > 0;

  return (
    <li className="flex flex-col text-white hover:text-purple-800 duration-300" onClick={onClick}>
      <div
        className={`flex items-center gap-4  cursor-pointer ${
          open && "w-50  "
        } relative peer px-3.5 py-2 rounded-md`}
      >
        <div className="flex items-center gap-4 flex-grow ">
          <Icon fontSize={20} />
          <span className={`${!open && "hidden"}`}>{label}</span>
        </div>
      </div>
      

    
    </li>
  );
};

export default NavItem;
