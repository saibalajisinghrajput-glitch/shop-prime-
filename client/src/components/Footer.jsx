import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-amazon-dark text-white">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-light py-3 text-center text-sm hover:bg-gray-700 transition-colors"
      >
        Back to top
      </button>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ShopPrime</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your premier online shopping destination. Discover millions of products at competitive prices with fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-gray-400 hover:text-white text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-400 hover:text-white text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=home-kitchen" className="text-gray-400 hover:text-white text-sm">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white text-sm">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMapPin /> 123 Commerce Street, New York, NY 10001
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMail /> support@shopprime.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold">
            Shop<span className="text-primary-500">Prime</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ShopPrime. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm">
              Privacy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

