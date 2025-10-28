import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Contact_Info = () => {
  return (
    <div className="order-2 flex flex-col md:order-1">
      {/* Section Content Block */}
      <div className="mb-8 text-left lg:mb-16 xl:mb-6">
        <div className="mx-auto md:mx-0 md:max-w-none">
          <h2>Get in touch with us directly</h2>
        </div>
      </div>
      {/* Section Content Block */}
      <div className="text-lg leading-[1.4] lg:text-[21px]">
        <p className="mb-7 last:mb-0">
          We are here to help you! Tell us how we can help &amp; we'll be in
          touch with an expert within the next 24 hours.
        </p>
        <ul className="mt-12 flex flex-col gap-y-8 lg:gap-y-12">
          <li className="flex flex-col gap-y-4 text-2xl font-bold">
            Send us an email:
            <a
              href="mailto:crownbankers.com@gmail.com"
              className="text-2xl font-normal leading-loose hover:text-colorOrangyRed lg:text-3xl"
            >
              crownbankers.com@gmail.com
            </a>
          </li>
          <li className="flex flex-col gap-y-4 text-2xl font-bold">
            Give us a call: +44 7452237405
          </li>
          <li className="flex flex-col gap-y-4 text-2xl font-bold">
            Follow us:
            <ul className="mt-auto flex gap-x-[15px]">
              <li>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  to="https://www.facebook.com/crownbankersofficial"
                  className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
                >
                  <FaFacebookF
                    className="text-black group-hover:text-white"
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
                    className="text-black group-hover:text-white"
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
                    className="text-black group-hover:text-white"
                    size={14}
                  />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact_Info;
