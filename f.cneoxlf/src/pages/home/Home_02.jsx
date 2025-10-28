import Header from '../../components/header/Header';
import Footer_02 from '../../components/footer/Footer_02';
import Blog from '../../components/sections/home_02/Blog';
import Hero from '../../components/sections/home_02/Hero';
import Feature from '../../components/sections/home_02/Feature';
import Content_01 from '../../components/sections/home_02/Content_01';
import Content_02 from '../../components/sections/home_02/Content_02';
import Content_03 from '../../components/sections/home_02/Content_03';
import Integrates from '../../components/sections/home_02/Integrates';
import Testimonial from '../../components/sections/home_02/Testimonial';
import Faq from '../../components/sections/home_02/Faq';

function Home_02() {
  return (
    <>
      <div className='page-wrapper relative z-[1] bg-white'>
        <Header
          loginCSS='hidden border-b-2 border-transparent font-bold text-white transition-all duration-300 hover:border-colorOrangyRed hover:text-colorOrangyRed lg:inline-block'
          signupCSS='button hidden rounded-[50px] border-none bg-colorViolet text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block'
          navColor='is-text-white'
          light
        />
        <main className='main-wrapper relative overflow-hidden'>
          {/*...::: Hero Section Start :::... */}
          <Hero />
          {/*...::: Hero Section End :::... */}
          {/*...::: Feature Section Start :::... */}
          <Feature />
          {/*...::: Feature Section End :::... */}
          {/* Separator */}
          <div className='global-container'>
            <div className='h-[1px] w-full bg-[#EAEDF0]' />
          </div>
          {/* Separator */}
          {/*...::: Content Section Start :::... */}
          <Content_01 />
          {/*...::: Content Section End :::... */}
          {/*...::: Content Section Start :::... */}
          <Content_02 />
          {/*...::: Content Section End :::... */}
          {/*...::: Content Section Start :::... */}
          <Content_03 />
          {/*...::: Content Section End :::... */}
          {/*...::: Content Section Start :::... */}
          <Integrates />
          {/*...::: Content Section End :::... */}
          {/*...::: Testimonial Section Start :::... */}
          <Testimonial />
          {/*...::: Testimonial Section Start :::... */}
          {/* Separator */}
          <div className='global-container'>
            <div className='h-[1px] w-full bg-[#EAEDF0]' />
          </div>
          {/* Separator */}
          {/*...::: Blog Section Start :::... */}
          <Blog />
          {/*...::: Blog Section Start :::... */}
          {/*...::: FAQ Section Start :::... */}
          <Faq />
          {/*...::: FAQ Section End :::... */}
        </main>
        <Footer_02 />
      </div>
    </>
  );
}

export default Home_02;
