/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `relative flex items-center px-4 py-2 my-3 rounded-lg font-medium transition-all duration-300 transform overflow-hidden
        ${
          isActive
            ? "bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 text-white"
            : "text-gray-700 hover:text-white"
        } hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-red-500`
      }
    >
      {/* Icon with hover color transition */}
      <Icon className="w-5 h-5 text-orange-500 group-hover:text-black transition-colors duration-300 " />

      <span className="mx-4">{label}</span>

      {/* Optional subtle background overlay for hover effect */}
      <span className="absolute inset-0 rounded-lg opacity-0 hover:opacity-20 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 transition-opacity duration-300"></span>
    </NavLink>
  );
};

export default MenuItem;
