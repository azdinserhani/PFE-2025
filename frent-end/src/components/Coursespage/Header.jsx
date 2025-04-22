import { IoIosArrowForward } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div style={{ backgroundColor: theme.cardBg }}>
      <div className="container mx-auto flex justify-between p-4">
        <span className="font-semibold text-[20px]" style={{ color: theme.text }}>Courses</span>
        <div className="">
          <p className="flex items-center gap-1" style={{ color: theme.text }}>
            Edupath <IoIosArrowForward />
            <span style={{ color: theme.primary }}>Courses</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
