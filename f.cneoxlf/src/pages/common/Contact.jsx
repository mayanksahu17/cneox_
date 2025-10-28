import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Contact_Section from "../../components/sections/inner-pages/contact/contact_section/Contact_Section";
import Map from "../../components/sections/inner-pages/contact/Map";
import Footer from "../../components/footer/Footer_05";
const Contact = () => {
  return (
    <>
      <main className="lg:pt-32">
        {/* <Breadcrumb title="Contact Us" link="Contact" /> */}
        <Contact_Section />
        {/* <Map /> */}
      </main>
      <Footer />
    </>
  );
};

export default Contact;
