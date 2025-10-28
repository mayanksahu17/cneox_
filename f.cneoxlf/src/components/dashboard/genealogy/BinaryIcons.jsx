import React from "react";

const BinaryIcons = () => {
  // Array of icon data
  const icons = [
    {
      src: "/assets/img/th-1/16.png",
      alt: "Package 1",
      label: "Solar Starter",
    },
    { src: "/assets/img/th-1/17.png", alt: "Package 2", label: "Power Growth" },
    { src: "/assets/img/th-1/18.png", alt: "Package 3", label: "Elite Energy" },
    {
      src: "/assets/img/th-1/verified.png",
      alt: "Verified User",
      label: "Verified User",
    },
    {
      src: "/assets/img/th-1/unverified.png",
      alt: "Unverified User",
      label: "Unverified User",
    },
    {
      src: "/assets/img/th-1/empty.png",
      alt: "Empty Position",
      label: "Empty Position",
    },
  ];

  // Updated business metrics
  const businessMetrics = [
    {
      label: "Total Business",
      description: "Total accumulated business value across all levels",
      color: "bg-gray-50",
    },
    {
      label: "Carry",
      description: "Excess business carried forward from the stronger leg",
      color: "bg-white",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Package & User Icons */}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-gray-300 items-center justify-center max-w-[600px]">
          {icons.map((icon, index) => (
            <div key={index} className="flex items-center gap-2 w-[150px]">
              <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
              <span className="text-xs">{icon.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Business Metrics Explanations */}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-gray-300 items-center justify-center max-w-[600px]">
          <h4 className="w-full text-center text-sm font-medium mb-2">Business Metrics Explained</h4>
          {businessMetrics.map((metric, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 w-full sm:w-[250px] p-2 rounded-md ${metric.color}`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold">{metric.label}</span>
                <span className="text-xs text-gray-600">{metric.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BinaryIcons;
