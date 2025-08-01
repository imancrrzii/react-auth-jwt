import { useState } from "react";
import logo1 from "../../assets/images/logo-landing-1.png";
import logo2 from "../../assets/images/logo-landing-2.png";
import { navItems } from "../../utils/data";
import { IoIosArrowDown } from "react-icons/io";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menuId) => {
    if (window.innerWidth >= 768) setOpenMenuId(menuId); // Desktop only
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setOpenMenuId(null); // Desktop only
  };

  const handleMenuClick = (menuId) => {
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMenuId(null); // Reset dropdowns
  };

  return (
    <nav
      className="sticky top-0 bg-sky-500 h-24 pt-6 w-full z-30"
      id="sifina-navbar"
    >
      {/* Navbar Container */}
      <div className="flex justify-between items-center h-full bg-white px-8 py-2 rounded-t-2xl lg:px-8 max-md:px-4 shadow-xs">
        {/* Logo Kiri */}
        <div className="flex h-full">
          <img
            className="h-full p-1 cursor-pointer max-sm:p-2"
            src={logo1}
            alt="Logo 1"
          />
        </div>

        {/* Menu Tengah - Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {Object.entries(navItems).map(([menuId, menu]) => (
            <div
              key={menuId}
              className="relative"
              onMouseEnter={() => handleMouseEnter(menuId)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="font-bold text-md transition-all duration-200 flex items-center cursor-pointer"
                onClick={() => handleMenuClick(menuId)}
              >
                {menu.title}
                {menu.items && menu.items.length > 0 && (
                  <IoIosArrowDown
                    className={`ml-1 h-5 w-5 transform transition-transform duration-200 ${
                      openMenuId === menuId ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {/* Dropdown - Desktop */}
              {menu.items && (
                <div
                  className={`absolute right-0 mt-2 bg-white border border-gray-200 shadow-xs rounded-md transition-all duration-400 min-w-[200px]
                    ${
                      openMenuId === menuId
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                >
                  <ul className="py-2">
                    {menu.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logo Kanan */}
        <div className="h-full flex">
          <img
            className="h-full p-1 cursor-pointer max-sm:p-2"
            src={logo2}
            alt="Logo 2"
          />
        </div>
        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <span
              className={`absolute ${
                isMobileMenuOpen
                  ? "rotate-180 opacity-0"
                  : "rotate-0 opacity-100"
              }`}
            >
              <MdMenu className="text-sky-500" size={24} />
            </span>
            <span
              className={`absolute transition-transform duration-700 ease-in-out ${
                isMobileMenuOpen
                  ? "rotate-0 opacity-100"
                  : "rotate-180 opacity-0"
              }`}
            >
              <MdClose className="text-sky-500" size={24} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white py-4 shadow-lg md:hidden">
          {Object.entries(navItems).map(([menuId, menu]) => (
            <div key={menuId} className="mb-4">
              <h3 className="font-semibold text-gray-300 text-lg mb-2 px-6">
                {menu.title}
              </h3>
              {menu.items && (
                <ul className="space-y-1">
                  {menu.items.map((item, idx) => (
                    <li key={idx}>
                      <div className="w-full hover:bg-gray-100 px-10 py-2 rounded cursor-pointer transition-colors duration-200">
                        {item.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
