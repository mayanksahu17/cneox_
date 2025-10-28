import { Outlet } from "react-router-dom";
import Footer_05 from "../footer/Footer_05";
import Header from "../header/Header";
import Whatsapp from "../../pages/Whatsapp";
import { TickerTape } from "react-ts-tradingview-widgets";

const Layout = () => {
  return (
    <div className="page-wrapper relative z-[1] bg-white">
      <div className="z-20 fixed h-20 md:h-20 bottom-[-31px] w-full">
        <TickerTape colorTheme="light"></TickerTape>
      </div>
      {/*...::: Header Start :::... */}
      <Header
        loginCSS="button hidden rounded-[50px] border-primary bg-primary text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block"
        signupCSS="button hidden rounded-[50px] border-black bg-black text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block"
        light={true}
      />
      {/*...::: Header End :::... */}

      {/*...::: Main Start :::... */}
      <Outlet />
      {/*...::: Main End :::... */}

      {/*...::: Footer Start :::... */}
      {/* <Footer_05 /> */}
      {/*...::: Footer End :::... */}
      <Whatsapp />
    </div>
  );
};

export default Layout;
