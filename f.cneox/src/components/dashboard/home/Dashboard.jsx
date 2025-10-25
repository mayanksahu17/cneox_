import React from "react";
import CardSelector from "./CardSelector";

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 h-full">
      <div className="container mx-auto flex flex-row gap-6 w-full">
        <div className="container mx-auto flex flex-col w-full">
          {/* My Card Section */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <div className="rounded-lg mb-4">
              <CardSelector />
            </div>
            <div className="space-y-2 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Your Balance</span>
                <span className="text-2xl font-bold">$128,320</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-500">+23.12%</span>
                <span className="text-red-500">-23.12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Currency</span>
                <span className="font-medium">USDT/US Dollar</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span className="font-medium">Active</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
              Get your card
            </button>
          </div>

          {/* Update Wallet Address */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-4">Update wallet address</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please enter your Withdrawal Wallet Address
              (Tether-TRC20(USDT.TRC20))
            </p>
            <input
              type="text"
              placeholder="1234 2345 7379 90"
              className="border border-gray-300 rounded-lg w-full p-2 mb-4"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Save address
            </button>
          </div>
        </div>

        <div className="container mx-auto flex flex-col w-full">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <span>ROI Wallet</span>
              <span className="font-bold">$128,320</span>
            </div>
            <div className="flex justify-between items-center">
              <span>R&B Wallet</span>
              <span className="font-bold">$128,320</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Extra Income Wallet</span>
              <span className="font-bold">$128,320</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Vouchers</span>
              <span className="font-bold">$128,320</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-4">Referral Links</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Left Link"
                  className="border border-gray-300 rounded-lg flex-1 p-2"
                />
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                  Copy link
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Right Link"
                  className="border border-gray-300 rounded-lg flex-1 p-2"
                />
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                  Copy link
                </button>
              </div>
            </div>
          </div>
          {/* Earnings and History Transactions Section */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Total Earnings */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-4">Total earning</h3>
              <div className="mb-4">
                <span className="text-lg font-bold">$475</span> Daily
              </div>
              <div className="mb-4">
                <span className="text-lg font-bold">$3,327</span> Weekly
              </div>
              <div>
                <span className="text-lg font-bold">$12,131</span> Monthly
              </div>
              {/* Donut Chart Placeholder */}
              <div className="mt-4 w-full h-40 bg-gray-200 rounded-lg"></div>
            </div>

            {/* History Transactions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-4">History Transactions</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Order Revenue</span>
                  <span className="text-green-500">+ $874</span>
                </li>
                <li className="flex justify-between">
                  <span>Withdrawal Initiated</span>
                  <span className="text-red-500">- $2,490</span>
                </li>
                <li className="flex justify-between">
                  <span>Order Revenue</span>
                  <span className="text-green-500">+ $126</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
