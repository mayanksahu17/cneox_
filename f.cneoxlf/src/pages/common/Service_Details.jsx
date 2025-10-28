import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Contact from "../../components/contact/Contact";
import Content_01 from "../../components/sections/inner-pages/service_details/Content_01";

import Content_04 from "../../components/sections/inner-pages/service_details/Content_04";

import Content_05 from "../../components/sections/inner-pages/service_details/Content_05";

import Content_06 from "../../components/sections/inner-pages/service_details/Content_06";
import Content_02 from "../../components/sections/inner-pages/service_details/Content_02";
import FunFact from "../../components/sections/inner-pages/service_details/FunFact";

const Services_Details = () => {
  return (
    <>
      <main className="main-wrapper relative overflow-hidden pt-32 bg-colorBlack text-white">
        {/*...::: Breadcrumb Section Start :::... */}
        {/* <Breadcrumb title='Our Services' link='Service Details' /> */}
        {/*...::: Breadcrumb Section End :::... */}
        {/*...::: Content Section Start :::... */}
        <Content_01 />
        <Content_04 />
        <Content_05 />
        <Content_06 />
        {/*...::: Content Section End :::... */}
        {/*...::: Content Section Start :::... */}
        <Content_02 />
        {/*...::: Content Section End :::... */}
        {/*...::: Funfact Section Start :::... */}
        <FunFact />
        {/*...::: Funfact Section End :::... */}
        {/*...::: Content Section Start :::... */}
        {/*...::: Content Section End :::... */}
        {/*...::: About Contact Section Start :::... */}
        <Contact />
        {/*...::: About Contact Section End :::... */}
      </main>
    </>
  );
};

export default Services_Details;
