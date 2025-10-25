import React from "react";

const Roadmap = () => {
  const milestones = [
    {
      year: "2022",
      title: "A Dream Takes Shape",
      points: [
        "Conceptualized Crown Bankers as a bridge between renewable energy and financial solutions.",
        "Built the foundation for a global platform focused on sustainable finance."
      ]
    },
    {
      year: "2023",
      title: "Laying the Foundation",
      points: [
        "Registered our website and secured the Crown Bankers domain.",
        "Broke ground on our first solar plant, marking our entry into the renewable energy sector.",
        "Established the pillars for global expansion in sustainable finance."
      ]
    },
    {
      year: "2024",
      title: "A Year of Transformation",
      points: [
        "Completed our first solar plant, officially contributing to clean energy production.",
        "Registered Crown Bankers in New Zealand and the UK, expanding our global presence.",
        "Opened our new corporate office, reinforcing our commitment to growth and innovation.",
        "Crown Bankers mobile app launching soon, bringing seamless access to our platform."
      ]
    },
    {
      year: "2025",
      title: "Global Expansion & Second Solar Plant",
      points: [
        "Opened our second solar plant in Groningen, Netherlands, expanding our renewable energy projects.",
        "Expand registrations to additional countries by the end of the year, unlocking new market opportunities.",
        "Host global events across multiple countries, strengthening industry connections.",
        "Continue scaling our solar and EV initiatives, integrating smarter solutions for the future."
      ]
    },
    {
      year: "2026",
      title: "Pioneering the Future",
      points: [
        "Begin manufacturing EV and solar components, reducing reliance on external suppliers.",
        "Expand Crown Bankers’ presence to over 30 countries, solidifying our global footprint.",
        "Introduce smart AI-driven solutions to optimize energy efficiency and financial management."
      ]
    },
    {
      year: "2027",
      title: "Smart Technology & Clean Mobility",
      points: [
        "Deploy AI-powered energy tracking, enhancing solar grid efficiency.",
        "Launch Crown Bankers EV Charging Stations in key global locations.",
        "Expand into smart electric vehicles, integrating autonomous driving and AI-based battery management."
      ]
    },
    {
      year: "2028",
      title: "A Global Leader in Sustainable Finance & Energy",
      points: [
        "Operate 100+ solar plants worldwide, making Crown Bankers a dominant player in clean energy.",
        "Establish fully integrated AI-powered smart grids, optimizing energy distribution.",
        "Expand into financial technology innovation, bridging fintech and sustainability."
      ]
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-8 lg:px-16" id="roadmap">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-12">
          Crown Bankers Roadmap (2022 – 2028)
        </h2>

        <div className="space-y-12">
          {milestones.map(({ year, title, points }) => (
            <div key={year} className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {year}: {title}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Diversified Revenue Model
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We operate a diversified multi-industry company generating revenue across solar energy, EV investments, and crypto assets, ensuring sustainable and high-yield returns.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our solar farms alone generate $9M+ annually, with net profits of $1.8M–$3.6M. Our EV and Forbes-listed investments yield 15%–35% profit margins, while crypto and DeFi strategies provide returns of 50%–500% yearly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            With our diversified asset base, we generate $24M+ monthly and $290M+ yearly in revenue. Our strategic investment approach allows us to provide stable daily payouts of 1.5%–2.4% to our users while maintaining long-term growth.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            This model aligns with how major MNCs in energy, fintech, and blockchain operate, ensuring high profitability, sustainability, and scalability in the long run.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
