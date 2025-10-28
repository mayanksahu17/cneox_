import { Link } from "react-router-dom";
import {
  Facebook,
  Youtube,
  Download,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
// Import WhatsApp icon from react-icons
import { FiMessageCircle } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full px-4 py-12 text-white bg-black">
      <div className="container mx-auto md:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Quick Contact */}
          <div>
            <p className="mb-6 text-xl font-bold text-yellow-500">Quick Contact</p>
            <p className="mb-6 text-white/70">
              Your Gateway to Prosperity. Experience strategic investing,
              innovative solutions, and financial excellence with us.
            </p>
            {/* <p className="mb-2 font-bold text-white">crownbankers.com@gmail.com</p>
            <div className="flex items-center mb-4 text-yellow-500">
              <Phone className="mr-2" size={20} />
              <span className="text-lg">+44 7452 176974</span>
            </div> */}
            <div className="flex items-center text-white/60">
              {/* <MapPin className="mr-2" size={20} /> */}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="mb-6 text-xl font-bold text-yellow-500">Company</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-6 text-xl font-bold text-yellow-500">Support</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/TermsandCondition"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/PrivacyPolicies"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Returns
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Products Catalogue (kept empty as before) */}
          <div>
            {/* optional catalogue/button can go here */}
            {/* <Link
              to="/catalogue"
              className="inline-flex items-center px-6 py-3 font-bold text-black transition-colors bg-yellow-500 rounded-md hover:bg-yellow-400"
            >
              <Download className="mr-2" size={20} />
              Download PDF
            </Link> */}
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col items-center justify-between pt-6 mt-12 border-t border-gray-900 md:flex-row">
          <div className="mb-4 text-sm text-center text-white/60 md:mb-0 md:text-left">
            © Copyright 2024, CNEOX. All Rights Reserved by CROWNQUEST
            ASSET MANAGEMENT LIMITED.
            <a
              href="https://crownbankers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-yellow-500 hover:text-yellow-400"
            >
              crownbankers.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/crownbankersofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors bg-gray-900 rounded-full hover:bg-yellow-500"
              aria-label="Facebook"
            >
              <Facebook size={20} className="text-yellow-500" />
            </a>
            <a
              href="https://www.youtube.com/@official-CrownBankers"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors bg-gray-900 rounded-full hover:bg-yellow-500"
              aria-label="YouTube"
            >
              <Youtube size={20} className="text-yellow-500" />
            </a>
            <a
              href="https://chat.whatsapp.com/K0pOZclpfH9DsLxvTyeY5q"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors bg-gray-900 rounded-full hover:bg-yellow-500"
              aria-label="WhatsApp"
            >
              <FiMessageCircle size={20} className="text-yellow-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
