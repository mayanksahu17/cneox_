import React, { useState } from "react";
import Footer from "../../../../components/footer/Footer_05";
import greenBackground from "../../../../assets/images/backgrounds/greenBackground.jpg";
function Fqa() {
  // State to manage which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ data with questions and placeholder answers
  const faqData = [
    {
      question: "Which Plan Is Right For Me?",
      answer:
        "Choosing the right plan depends on your investment goals, risk tolerance, and financial situation. We recommend reviewing our plan options on the website and consulting with one of our advisors to find the best fit for your needs.",
    },
    {
      question: "What are my payment options?",
      answer:
        "Crown Bankers offers multiple payment options, including bank transfers, credit/debit cards, and select third-party payment processors. You can find more details in the payment section of your account dashboard.",
    },
    {
      question: "Do I have to commit to a contract?",
      answer:
        "No, Crown Bankers does not require a long-term contract for most plans. However, certain investment products may have specific terms. Please review the product details or contact support for more information.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "Our free trial allows you to explore Crown Bankers' platform for a limited period, typically 14 days, with access to select features. No payment is required upfront, but you’ll need to provide billing information to activate the trial.",
    },
    {
      question: "What Payment Methods Are Available?",
      answer:
        "We accept a variety of payment methods, including major credit/debit cards, bank transfers, and certain digital wallets. Check the payment section on our website for a full list of supported methods.",
    },
    {
      question: "What if I pick the wrong plan?",
      answer:
        "If you select a plan that doesn’t suit your needs, you can contact our support team within 30 days to switch to a different plan. We’ll help you find the right option without any penalty.",
    },
    {
      question: "If I have questions, where can I find answers?",
      answer:
        "You can find answers in our Help Center on the website, or you can reach out to our support team at crownbankers.com@gmail.com. We’re here to assist you with any questions you may have.",
    },
  ];

  // Toggle function for opening/closing FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{ backgroundImage: `url(${greenBackground})` }}
      className="lg:pt-32"
    >
      <section className="py-12">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section Title */}
          <h1 className="mb-12 text-4xl font-extrabold text-center text-white sm:text-4xl">
            Frequently Asked Questions
          </h1>

          {/* FAQ Card */}
          <div className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 last:border-b-0"
                >
                  {/* Question with Toggle */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center justify-between w-full py-4 text-left focus:outline-none"
                  >
                    <label className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </label>
                    <span className="text-2xl text-green-600">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer (shown when open) */}
                  {openIndex === index && (
                    <div className="pb-4">
                      <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Fqa;
