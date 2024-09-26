import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setUser(null));
    navigate("/login");
  };

  const navigateToDashboard = () => {
    if (user?.role === 'admin') {
      navigate("/dashboard");
    }
  };

  const cartItemCount = cartItems.length;

  return (
    <nav className="bg-gray-900 fixed w-full z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-red-500 transform hover:scale-105 transition-transform duration-300">
                MyStore
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            {user?.role === 'admin' ? (
              <button
                onClick={navigateToDashboard}
                className="text-white font-serif font-semibold hover:text-white text-lg transform hover:scale-110 transition-transform duration-300 hover:bg-cyan-900"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white font-serif font-semibold hover:text-white text-lg transform hover:scale-110 transition-transform duration-300 hover:bg-cyan-900"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-white font-serif font-semibold hover:text-white text-lg transform hover:scale-110 transition-transform duration-300 hover:bg-cyan-900"
                >
                  Products
                </Link>
              </>
            )}
          </div>

          {/* Right side (Login/Profile and Cart) */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="relative">
                <UserIcon
                  className="h-7 w-7 text-white hover:scale-150 transform transition-transform duration-300 cursor-pointer"
                  onClick={toggleProfileMenu}
                />
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-100 border border-gray-200 rounded-lg shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                    {user.role === 'admin' && (
                      <button
                        onClick={navigateToDashboard}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-600 hover:text-white"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-600 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-800 transform hover:scale-150 transition-transform duration-300"
              >
                <UserIcon className="h-6 text-white w-6" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center text-gray-800 transform hover:scale-150 transition-transform duration-300"
            >
              <ShoppingCartIcon className="h-6 text-white w-6" />
              <span className={`absolute -top-1 -right-1 ${cartItemCount === 0 ? 'bg-red-600' : 'bg-red-600'} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                {cartItemCount === 0 ? '0' : cartItemCount}
              </span>
            </Link>
          </div>

          {/* Hamburger Menu for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:bg-cyan-800 focus:outline-none transform hover:scale-110 transition-transform duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg py-2">
          {user?.role === 'admin' ? (
            <button
              onClick={navigateToDashboard}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg transform hover:scale-105 transition-transform duration-300"
            >
              Dashboard
            </button>
          ) : (
            <>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg transform hover:scale-105 transition-transform duration-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg transform hover:scale-105 transition-transform duration-300"
              >
                Products
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
