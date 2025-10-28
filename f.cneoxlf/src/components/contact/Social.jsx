import React from "react";
import { FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Social = () => {
  return (
    <ul className="mt-auto flex gap-x-[15px]">
      <li>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          to="https://www.facebook.com/crownbankersofficial"
          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
        >
          <FaFacebookF
            className="text-primary group-hover:text-white"
            size={14}
          />
        </Link>
      </li>
      <li>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          to="https://www.youtube.com/@official-CrownBankers"
          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
        >
          <FaYoutube
            className="text-primary group-hover:text-white"
            size={14}
          />
        </Link>
      </li>
      <li>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          to="https://chat.whatsapp.com/K0pOZclpfH9DsLxvTyeY5q"
          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
        >
          <FaWhatsapp
            className="text-primary group-hover:text-white"
            size={14}
          />
        </Link>
      </li>
    </ul>
  );
};

export default Social;
