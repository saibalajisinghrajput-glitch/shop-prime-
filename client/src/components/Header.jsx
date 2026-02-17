import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiPackage, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-amazon-dark text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">
              Shop<span className="text-primary-500">Prime</span>
            </span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ShopPrime"
                  className="w-full px-4 py-2.5 text-gray-900 rounded-l-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 px-6 py-2.5 rounded-r-md transition-colors"
              >
                <FiSearch className="text-xl text-gray-900" />
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Account dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 py-2 px-2 hover:border border-white rounded transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="text-xs">
                  <p className="text-gray-300">Hello, {user?.name?.split(' ')[0] || 'Sign in'}</p>
                  <p className="font-bold text-sm">Account & Lists</p>
                </div>
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 py-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiUser /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiPackage /> My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FiHeart /> Wishlist
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-center btn-primary mx-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-1 p-2 hover:border border-white rounded transition-colors">
              <div className="relative">
                <FiShoppingCart className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-2 pb-2">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button type="submit" className="bg-primary-500 px-4 py-2 rounded-r-md">
              <FiSearch className="text-xl text-gray-900" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-amazon-light text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          <Link to="/" className="text-sm hover:underline whitespace-nowrap">
            Home
          </Link>
          <Link to="/products" className="text-sm hover:underline whitespace-nowrap">
            All Products
          </Link>
          <Link to="/products?category=electronics" className="text-sm hover:underline whitespace-nowrap">
            Electronics
          </Link>
          <Link to="/products?category=clothing" className="text-sm hover:underline whitespace-nowrap">
            Clothing
          </Link>
          <Link to="/products?category=home-kitchen" className="text-sm hover:underline whitespace-nowrap">
            Home & Kitchen
          </Link>
          <Link to="/products?category=beauty" className="text-sm hover:underline whitespace-nowrap">
            Beauty
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-amazon-dark text-white p-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="py-2 border-b border-gray-700" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            <Link to="/products" className="py-2 border-b border-gray-700" onClick={() => setShowMobileMenu(false)}>
              All Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="py-2 border-b border-gray-700" onClick={() => setShowMobileMenu(false)}>
                  My Profile
                </Link>
                <Link to="/orders" className="py-2 border-b border-gray-700" onClick={() => setShowMobileMenu(false)}>
                  My Orders
                </Link>
                <button onClick={handleLogout} className="py-2 text-left text-red-400">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="py-2 text-primary-500" onClick={() => setShowMobileMenu(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

