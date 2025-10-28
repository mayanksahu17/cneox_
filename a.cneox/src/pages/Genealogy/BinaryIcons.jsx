import React from "react";
import {
  EllipseFive,
  EllipseSix,
  PackageOne,
  PackageThree,
  PackageTwo,
  VerifiedImage,
} from "../../assets";

const BinaryIcons = () => {
  // Array of icon data
  const icons = [
    {
      src: PackageOne,
      alt: "Package 1",
      label: "Solar Starter",
    },
    { src: PackageTwo, alt: "Package 2", label: "Power Growth" },
    { src: PackageThree, alt: "Package 3", label: "Elite Energy" },
    {
      src: VerifiedImage,
      alt: "Package 3",
      label: "Verified User",
    },
    {
      src: EllipseSix,
      alt: "Package 3",
      label: "Unverified User",
    },
    {
      src: EllipseFive,
      alt: "Package 3",
      label: "Empty Position",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-8 p-8 rounded-2xl border-2 border-gray-300 items-center justify-center w-[612px]">
        {icons.map((icon, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img src={icon.src} alt={icon.alt} className="w-12 h-12" />
            <span>{icon.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryIcons;
