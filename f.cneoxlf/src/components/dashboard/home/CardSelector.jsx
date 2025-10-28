import React, { useState } from "react";
import CrownCard from "./CrownCard";
import BankCard from "./BankCard";
import GoldCard from "./GoldCard";
import PlatinumCard from "./PlatinumCard";

export default function CardSelector() {
  const [selectedCard, setSelectedCard] = useState("blue");

  const renderCard = () => {
    switch (selectedCard) {
      case "blue":
        return <CrownCard />;
      case "black":
        return <BankCard />;
      case "gold":
        return <GoldCard />;
      case "platinum":
        return <PlatinumCard />;
      default:
        return <CrownCard />;
    }
  };

  const renderCardDescription = () => {
    switch (selectedCard) {
      case "blue":
        return (
          <div className="text-center text-sm text-gray-600 mt-2">
            <h3 className="font-bold text-blue-500">Standard Blue Card</h3>
            <p>Basic financial services with no annual fee</p>
          </div>
        );
      case "black":
        return (
          <div className="text-center text-sm text-gray-600 mt-2">
            <h3 className="font-bold text-gray-800">VIP Black Card</h3>
            <p>Enhanced services with priority support and higher limits</p>
          </div>
        );
      case "gold":
        return (
          <div className="text-center text-sm text-gray-600 mt-2">
            <h3 className="font-bold text-yellow-600">Premium Gold Card</h3>
            <p>Premium benefits with unlimited withdrawals and cash back rewards</p>
          </div>
        );
      case "platinum":
        return (
          <div className="text-center text-sm text-gray-600 mt-2">
            <h3 className="font-bold text-gray-500">Exclusive Platinum Card</h3>
            <p>Ultimate benefits including concierge service and exclusive deals</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        {renderCard()}
        {renderCardDescription()}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setSelectedCard("blue")}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCard === "blue"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Blue
        </button>
        <button
          onClick={() => setSelectedCard("black")}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCard === "black"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Black
        </button>
        <button
          onClick={() => setSelectedCard("gold")}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCard === "gold"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Gold
        </button>
        <button
          onClick={() => setSelectedCard("platinum")}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCard === "platinum"
              ? "bg-gray-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Platinum
        </button>
      </div>
    </div>
  );
} 