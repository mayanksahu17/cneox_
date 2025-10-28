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
  "24/7 unlimited access to our live support.",
  "Zero withdrawal charges for referral and binary incomes.",
  "Referral and binary earnings will be credited instantly.",
  "Referral rewards up to 9%.",
  "Binary bonus of 10% on the weaker leg.",
  "Progress through Bronze to White Diamond levels in Crown rewards.",
];
const Benefits = () => {
  return (
    <section id="section-working-process ">
      <div className="bg-colorBlack text-white px-4 md:px-60">
        <div className="relative z-[1] w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <h1 className="text-4xl text-white text-center mb-6">Benefits</h1>
              <div className="flex flex-col  gap-10 justify-center w-full items-center">
                <div className="flex flex-col md:flex-row justify-center gap-10">
                  <BoxComponent
                    text="24/7 unlimited access to our live support."
                    img={"assets/img/th-1/41.png"}
                  />
                  <div className="mt-0 md:mt-12">
                    <BoxComponent
                      text="Zero withdrawal charges for referral and binary incomes."
                      img={"assets/img/th-1/42.png"}
                    />
                  </div>
                  <div className="mt-0 md:mt-24">
                    <BoxComponent
                      text="Referral and binary earnings will be credited instantly."
                      img={"assets/img/th-1/41.png"}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-10">
                  <BoxComponent
                    text="Referral rewards up to 9%."
                    img={"assets/img/th-1/41.png"}
                  />
                  <div className="mt-0 md:mt-12">
                    <BoxComponent
                      text="Binary bonus of 10% on the weaker leg."
                      img={"assets/img/th-1/42.png"}
                    />
                  </div>
                  <div className="mt-0 md:mt-24">
                    <BoxComponent
                      text="Progress through Sunstone to Celestial levels in Crown rewards."
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

export default Benefits;
