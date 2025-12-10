import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo2.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>

            {/* Centered Navigation Links */}
            <div className="hidden md:flex gap-6 font-semibold">
              <Link to="/" className="hover:text-orange-600 transition">
                Home
              </Link>
              <Link to="/meals" className="hover:text-orange-600 transition">
                Meals
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="hover:text-orange-600 transition"
                >
                  Dashboard
                </Link>
              )}
              <Link to="/about-us" className="hover:text-orange-600 transition">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-orange-600 transition">
                Contact
              </Link>
            </div>

            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <img
                    src={user.photoURL || avatarImg}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <button
                    onClick={logOut}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="relative md:hidden">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <img
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>

              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[60vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/meals"
                      className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Meals
                    </Link>
                    {user && (
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/about-us"
                      className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>

                    {user ? (
                      <div
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-orange-100 transition font-semibold cursor-pointer"
                      >
                        Logout
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-orange-100 transition font-semibold"
                          onClick={() => setIsOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
