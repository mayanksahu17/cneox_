import { ArrowRight, PiggyBank, Shield } from "lucide-react";

const BankingHeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-[600px] bg-black text-white">
      {/* Left Side - Background Image */}
      <div
        className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-auto bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/assets/img/section3.jpg')",
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Right Side - Themed Section */}
      <div className="w-full md:w-1/2 bg-black text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center border-l border-yellow-500">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 leading-tight tracking-normal">
          Take Charge Of Your Financial Future With <br />
          <span className="text-yellow-500">Smart & Secure Banking!</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-white/80">
          The world of banking and investments is evolving fast, and so are your
          financial needs. Whether you're looking to grow your savings, invest
          wisely, or manage your wealth with confidence, we're here to help.
          With the right financial tools and expert guidance, you can take
          control of your future—without the stress.
        </p>

        {/* Two Feature Columns */}
        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          <div className="flex-1 bg-gray-900/60 border border-yellow-500 p-4 rounded-lg hover:bg-yellow-500 group transition-all duration-300">
            <PiggyBank className="text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 mb-3 group-hover:text-black transition-colors" />
            <h3 className="font-semibold text-base sm:text-lg text-yellow-500 group-hover:text-black">
              Grow Your Wealth, Securely & Smartly
            </h3>
            <p className="text-white/80 text-sm mt-2 group-hover:text-black/80">
              Your money should work for you! From secure banking to high-yield
              investments, we help you build a solid financial future with
              confidence.
            </p>
          </div>

          <div className="flex-1 bg-gray-900/60 border border-yellow-500 p-4 rounded-lg hover:bg-yellow-500 group transition-all duration-300">
            <Shield className="text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 mb-3 group-hover:text-black transition-colors" />
            <h3 className="font-semibold text-base sm:text-lg text-yellow-500 group-hover:text-black">
              We've Got Your Back—Always!
            </h3>
            <p className="text-white/80 text-sm mt-2 group-hover:text-black/80">
              Great banking isn't just about numbers. It's about trust, support,
              and making sure you always feel valued. Our team is here to guide
              you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingHeroSection;
