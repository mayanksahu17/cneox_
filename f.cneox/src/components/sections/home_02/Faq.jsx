import useAccordion from '../../../hooks/useAccordion';

const Faq = () => {
  const [activeIndex, handleAccordion] = useAccordion(0);
  return (
    <section id='faq-section'>
      {/* Section Spacer */}
      <div className='pb-40 xl:pb-[220px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Section Content Block */}
          <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]'>
            <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
              AI Chatbot FAQs for more information
            </h2>
          </div>
          {/* Section Content Block */}
          {/* Accordion*/}
          <ul className='accordion flex flex-col gap-y-6'>
            {/* Accordion items */}
            <li
              className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                activeIndex === 0 ? 'active' : ''
              }`}
              onClick={() => handleAccordion(0)}
              data-jos_delay='0.1'
            >
              <div className='accordion-header flex items-center justify-between'>
                <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                  What is Artificial Intelligence (AI)?
                </h5>
                <div className='accordion-icon is-blue'>
                  <img src='assets/img/plus.svg' alt='plus' />
                  <img src='assets/img/plus-white.svg' alt='plus-white' />
                </div>
              </div>
              <div className='accordion-content text-lg text-[#2C2C2C]'>
                <p>
                  AI chatbots work by analyzing user input, understanding the
                  intent behind the message, and providing relevant responses
                  based on pre-defined rules or machine learning models. They
                  can learn from user interactions to improve over time.
                </p>
              </div>
            </li>
            {/* Accordion items */}
            {/* Accordion items */}
            <li
              className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                activeIndex === 1 ? 'active' : ''
              }`}
              onClick={() => handleAccordion(1)}
              data-jos_delay='0.1'
            >
              <div className='accordion-header flex items-center justify-between'>
                <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                  What are the benefits of using AI chatbots?
                </h5>
                <div className='accordion-icon is-blue'>
                  <img src='assets/img/plus.svg' alt='plus' />
                  <img src='assets/img/plus-white.svg' alt='plus-white' />
                </div>
              </div>
              <div className='accordion-content text-lg text-[#2C2C2C]'>
                <p>
                  AI chatbots work by analyzing user input, understanding the
                  intent behind the message, and providing relevant responses
                  based on pre-defined rules or machine learning models. They
                  can learn from user interactions to improve over time.
                </p>
              </div>
            </li>
            {/* Accordion items */}
            {/* Accordion items */}
            <li
              className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                activeIndex === 2 ? 'active' : ''
              }`}
              onClick={() => handleAccordion(2)}
              data-jos_delay='0.1'
            >
              <div className='accordion-header flex items-center justify-between'>
                <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                  Can AI chatbots understand multiple languages?
                </h5>
                <div className='accordion-icon is-blue'>
                  <img src='assets/img/plus.svg' alt='plus' />
                  <img src='assets/img/plus-white.svg' alt='plus-white' />
                </div>
              </div>
              <div className='accordion-content text-lg text-[#2C2C2C]'>
                <p>
                  AI chatbots work by analyzing user input, understanding the
                  intent behind the message, and providing relevant responses
                  based on pre-defined rules or machine learning models. They
                  can learn from user interactions to improve over time.
                </p>
              </div>
            </li>
            {/* Accordion items */}
            {/* Accordion items */}
            <li
              className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                activeIndex === 3 ? 'active' : ''
              }`}
              onClick={() => handleAccordion(3)}
              data-jos_delay='0.1'
            >
              <div className='accordion-header flex items-center justify-between'>
                <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                  Can AI chatbots provide personalized responses?
                </h5>
                <div className='accordion-icon is-blue'>
                  <img src='assets/img/plus.svg' alt='plus' />
                  <img src='assets/img/plus-white.svg' alt='plus-white' />
                </div>
              </div>
              <div className='accordion-content text-lg text-[#2C2C2C]'>
                <p>
                  AI chatbots work by analyzing user input, understanding the
                  intent behind the message, and providing relevant responses
                  based on pre-defined rules or machine learning models. They
                  can learn from user interactions to improve over time.
                </p>
              </div>
            </li>
            {/* Accordion items */}
            {/* Accordion items */}
            <li
              className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                activeIndex === 4 ? 'active' : ''
              }`}
              onClick={() => handleAccordion(4)}
              data-jos_delay='0.1'
            >
              <div className='accordion-header flex items-center justify-between'>
                <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                  How can I integrate an AI chatbot into my business or website?
                </h5>
                <div className='accordion-icon is-blue'>
                  <img src='assets/img/plus.svg' alt='plus' />
                  <img src='assets/img/plus-white.svg' alt='plus-white' />
                </div>
              </div>
              <div className='accordion-content text-lg text-[#2C2C2C]'>
                <p>
                  AI chatbots work by analyzing user input, understanding the
                  intent behind the message, and providing relevant responses
                  based on pre-defined rules or machine learning models. They
                  can learn from user interactions to improve over time.
                </p>
              </div>
            </li>
            {/* Accordion items */}
          </ul>
          {/* Accordion*/}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Faq;
