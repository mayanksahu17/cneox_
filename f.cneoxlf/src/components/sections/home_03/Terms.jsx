const BoxComponent = ({ text, img }) => {
  return (
    <div
      className="w-full md:w-[300px] h-[200px] rounded-xl bg-[#242424] p-6 flex flex-col justify-start relative"
      style={{
        border: "2px solid",
        borderImage:
          "linear-gradient(180deg, #45E3FF 0%, rgba(69, 227, 255, 0.15) 100%) 1",
        borderRadius: "8px",
      }}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border border-2 border-[#2eccfa] flex items-center justify-center">
          <img src={img} alt="hero-img" className="relative h-6 w-6" />
        </div>
      </div>
      <div className="mt-16 text-white font-medium text-xl">{text}</div>
    </div>
  );
};

const texts = [
  "Return on Investment (ROI) credited Mon-Fri.",
  "Referral and binary withdrawals are available 24/7.",
  "Monthly ROI withdrawals are allowed up to 5 times.",
  "Once a withdrawal is placed, it will be approved and paid within 0 to 8 hours.",
  "Withdrawal charges for ROI income range from 3% to 7%.",
  "Binary capping limit ranges from $1,000 to $7,000.",
];
const Terms = () => {
  return (
    <section id="section-working-process ">
      <div className="bg-colorBlack text-white px-4 md:px-60">
        <div className="relative z-[1] w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <h1 className="text-4xl text-white text-center mb-6">Terms</h1>
              <div className="flex flex-col  gap-10 justify-center w-full items-center">
                <div className="flex flex-col md:flex-row justify-center gap-10">
                  <BoxComponent
                    text="Return on Investment (ROI) credited Mon-Fri."
                    img={"assets/img/th-1/41.png"}
                  />
                  <div className="mt-0 md:mt-12">
                    <BoxComponent
                      text="Referral and binary withdrawals are available 24/7."
                      img={"assets/img/th-1/42.png"}
                    />
                  </div>
                  <div className="mt-0 md:mt-24">
                    <BoxComponent
                      text="Monthly ROI withdrawals are allowed up to 5 times."
                      img={"assets/img/th-1/41.png"}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-10">
                  <BoxComponent
                    text="Once a withdrawal is placed, it will be approved and paid within 0 to 8 hours."
                    img={"assets/img/th-1/41.png"}
                  />
                  <div className="mt-0 md:mt-12">
                    <BoxComponent
                      text="Withdrawal charges for ROI income range from 3% to 7%."
                      img={"assets/img/th-1/42.png"}
                    />
                  </div>
                  <div className="mt-0 md:mt-24">
                    <BoxComponent
                      text="Binary capping limit ranges from $1,000 to $7,000."
                      img={"assets/img/th-1/41.png"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
