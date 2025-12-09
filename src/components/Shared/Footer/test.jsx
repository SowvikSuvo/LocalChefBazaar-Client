import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo2.png";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ChefMenu from "./Menu/ChefMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, roleLoading] = useRole();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => setActive(!isActive);

  if (roleLoading) return null;

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white flex justify-between md:hidden sticky top-0 z-50 shadow-2xl">
        <Link to="/" className="p-4">
          <img src={logo} alt="logo" className="h-12 rounded-lg shadow-lg" />
        </Link>
        <button
          onClick={handleToggle}
          className="p-4 hover:bg-white/20 transition-all rounded-lg"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isActive ? -300 : 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-2xl shadow-2xl border-r border-white/20 flex flex-col h-full transform transition-all duration-300`}
      >
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-10 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -right-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-28 mx-auto rounded-2xl shadow-xl ring-4 ring-white/50"
                />
              </Link>
            </motion.div>
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 capitalize font-medium">
              {role} Panel
            </p>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <nav className="space-y-2">
              {/* Home */}
              <Link
                to="/"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:shadow-lg transition-all duration-300 group"
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <FaHome className="text-xl text-purple-600" />
                </motion.div>
                <span className="group-hover:text-purple-700">Home Page</span>
              </Link>

              {/* Role-Based Menus */}
              {role === "user" && <CustomerMenu />}
              {role === "chef" && <ChefMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 p-4 space-y-3">
            <MenuItem
              icon={FcSettings}
              label="Profile Settings"
              address="/dashboard"
              className="hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 rounded-2xl py-4"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logOut}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <GrLogout className="text-xl" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Overlay for Mobile */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default Sidebar;