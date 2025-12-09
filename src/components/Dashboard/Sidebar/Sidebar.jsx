import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo2.png";
import { motion } from "framer-motion";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ChefMenu from "./Menu/ChefMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import { FaHome } from "react-icons/fa";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, roleLoading] = useRole();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  if (roleLoading) {
    return null;
  }
  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 shadow-xl text-gray-800 flex justify-between md:hidden sticky top-0 z-50 shadow-md rounded">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isActive ? -300 : 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 shadow-xl rounded-r-3xl`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-full justify-center items-center bg-orange-200 mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-orange-300">
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                  className="rounded"
                />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center px-4 py-2 mt-10 text-gray-700 font-semibold rounded-lg relative overflow-hidden group transition-all duration-300 hover:text-white"
              >
                <span className="flex items-center gap-5 z-10">
                  <FaHome className="transition-transform duration-300 group-hover:scale-110 text-orange-500" />
                  Home Page
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></span>
              </Link>

              {/* Role-Based Menus */}
              {role === "user" && <CustomerMenu />}
              {role === "chef" && <ChefMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr className="border-gray-300 my-4" />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard"
              className="relative flex items-center px-4 py-2 mb-3 rounded-lg font-semibold text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-red-500 transition-all duration-300"
            />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-2 text-gray-700 font-medium rounded-lg relative overflow-hidden group transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-red-500"
            >
              <GrLogout className="w-5 h-5 z-10 transition-transform duration-300 group-hover:rotate-12" />
              <span className="mx-4 font-medium z-10">Logout</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
