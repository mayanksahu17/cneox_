import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Logo from "../logo/Logo";
import CountdownTimer from "../dashboard/CountDownTimer";
import {
  Mail,
  Clock,
  MapPin,
  Search,
  ShoppingCart,
  ChevronDown,
  Twitter,
  Youtube,
  Facebook,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FiMessageCircle } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const Header = ({ loginCSS, signupCSS, navColor, light }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header
      className="text-black bg-white site-header site-header--absolute is--white"
      id="sticky-menu"
    >
      <div className="items-center justify-between hidden py-2 bg-white border-2 border-b border-gray-300 md:flex md:px-24">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Email: crownbankers.com@gmail.com </span>
          </div>
          {/* <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon - Fri: 8:00 am - 7:00 pm</span>
                </div>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-green-500 hover:text-green-600"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </Link> */}
        </div>

        <div className="flex items-center space-x-5">
          <Phone className="text-green-500" />

          <div className="text-right">
            <Link
              to="tel:+44 7452 176974"
              className="text-xl font-bold text-gray-800"
            >
              +44 7452 176974
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="https://www.facebook.com/realcrownbankers"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#4CAF50] p-1.5 flex items-center justify-center"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="w-4 h-4 text-white" />
            </Link>
            <Link
              to="https://www.youtube.com/@official-CrownBankers"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#4CAF50] p-1.5 flex items-center justify-center"
            >
              <span className="sr-only">YouTube</span>
              <Youtube className="w-4 h-4 text-white" />
            </Link>
            <Link
              to="https://chat.whatsapp.com/K0pOZclpfH9DsLxvTyeY5q"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#4CAF50] p-1.5 flex items-center justify-center"
            >
              <span className="sr-only">WhatsApp</span>
              <FiMessageCircle className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="global-container">
        <div className="">
          {/* Header Logo */}
          {/* <Link to="/" className="flex items-center">
            <div className="relative h-18 w-36">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-white rounded-md ">
                  <img
                    src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742818322/logo1_mp91bc.png"
                    alt="logo1"
                    height={300}
                    width={350}
                  />
                </div>
                <div>
                
                </div>
              </div>
            </div>
          </Link> */}
          {/* Header Logo */}
          {/* Header Navigation */}
          <Navbar
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            color={navColor}
          />
          {/* Header Navigation */}
          {/* Header User Event */}
          <div className="flex items-center gap-6 text-white">
            {/* <Link to="/login" className={loginCSS}>
              Login
            </Link>
            <Link to="/signup" className={signupCSS}>
              Sign up free
            </Link> */}
            {/* Responsive Off-canvas Menu Button */}
            {/* <div className="block lg:hidden">
              <button
                onClick={() => setMobileMenu(true)}
                className={`mobile-menu-trigger ${
                  light ? "is-white" : "is-black"
                }`}
              >
                <span />
              </button>
            </div> */}
          </div>
          {/* Header User Event */}
        </div>
      </div>
      {/* <div className="flex justify-center w-full align-center">
        <CountdownTimer />
      </div> */}
    </header>
  );
};

export default Header;
