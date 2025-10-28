import React, { useState } from "react";
import withdrawalService from "../../../services/withdrawalService";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Select from "../global/Select";
import Button from "../global/Button";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const WithdrawalModal = ({
  isWithdrawalModalOpen,
  setIsWithdrawalModalOpen,
  selectedWallet,
  allData,
  setRender,
}) => {
  const { user } = useAuth();

  const [withdrawalData, setWithdrawalData] = useState({
    isOTPSentForWithdrawal: false,
    amount: 0,
    fromWallet: {
      label:
        selectedWallet === "rnb"
          ? "R&B Wallet"
          : selectedWallet === "roi"
          ? "ROI Wallet"
          : "Extra Income Wallet",
      value:
        selectedWallet === "rnb"
          ? "R&B"
          : selectedWallet === "roi"
          ? "ROI"
          : "Interest",
    },
    withdrawalMethod: {
      label: "Withdrawal Wallet",
      value: "regular",
    },
    securityPin: "",
    currency: {
      label: "Bitcoin",
      value: "BTC",
    },
    otp: "",
    isLoading: false,
  });

  const handleWithdrawalDataChange = (name, value) =>
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      border: "1px solid #facc15",
      borderRadius: "8px",
      padding: "2px",
      boxShadow: "none",
      color: "#facc15",
      minHeight: "42px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#facc15",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      border: "1px solid #facc15",
      borderRadius: "8px",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#facc15" : "#000000",
      color: state.isFocused ? "#000000" : "#facc15",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#facc15",
      opacity: 0.8,
    }),
    input: (provided) => ({
      ...provided,
      color: "#facc15",
    }),
  };

  const handleWithdrawalSubmit = async () => {
    if (parseFloat(withdrawalData?.amount) < 20) {
      toast.error("Withdrawal amount has to be greater than $20");
      return;
    }

    if (
      Number(user?.user?.security_pin) !== Number(withdrawalData?.securityPin)
    ) {
      toast.error("Invalid security pin");
      return;
    }

    if (
      withdrawalData.fromWallet?.value === "Interest" &&
      new Date().getDate() !== 1
    ) {
      alert(
        "Withdrawals from Extra Income Wallet are only allowed on the 1st of every month."
      );
      return;
    }

    const amountUserCanWithdrawal = {
      "R&B": parseFloat(allData.referral_binary_wallet),
      ROI: parseFloat(allData.roi_wallet),
      Interest: parseFloat(allData.interest_wallet),
    };

    if (
      parseFloat(withdrawalData.amount) >
      amountUserCanWithdrawal[withdrawalData.fromWallet?.value]
    ) {
      toast.error(
        `You can only withdraw $${amountUserCanWithdrawal[
          withdrawalData.fromWallet?.value
        ]?.toFixed(2)}`
      );
      return;
    }

    try {
      if (!withdrawalData.isOTPSentForWithdrawal) {
        handleWithdrawalDataChange("isLoading", true);
        const res = await withdrawalService.sentOTP(user);

        if (res.status === 200) {
          handleWithdrawalDataChange("isLoading", false);
          handleWithdrawalDataChange("isOTPSentForWithdrawal", true);
        }
      } else {
        const tempData = {
          amount: withdrawalData.amount,
          currency: "USDT.TRC20",
          from_wallet: withdrawalData.fromWallet?.value,
          security_pin: withdrawalData.securityPin,
          otp: withdrawalData.otp,
          withdrawalMethod: withdrawalData?.withdrawalMethod?.value,
        };

        handleWithdrawalDataChange("isLoading", true);
        const res = await withdrawalService.createWithdrawal(user, tempData);

        if (res.status === 200) {
          handleWithdrawalDataChange("isLoading", false);
          toast.success("Withdrawal created successfully");
          setWithdrawalData({
            isOTPSentForWithdrawal: false,
            amount: 0,
            fromWallet: {
              label: "R&B Wallet",
              value: "R&B",
            },
            withdrawalMethod: {
              label: "Withdrawal Wallet",
              value: "regular",
            },
            securityPin: "",
            currency: {
              label: "Bitcoin",
              value: "BTC",
            },
            otp: "",
            isLoading: false,
          });
          setRender((prev) => !prev);
          setIsWithdrawalModalOpen(false);
        }
      }
    } catch (error) {
      handleWithdrawalDataChange("isLoading", false);
      const msg =
        error?.response?.data?.message ||
        "Something went wrong, please try again later";
      toast.error(msg);
    }
  };

  return (
    <Modal
      isOpen={isWithdrawalModalOpen}
      handleClose={() => setIsWithdrawalModalOpen(false)}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-2xl font-semibold text-yellow-500">
          Withdraw Funds
        </p>
        <IoClose
          size={24}
          className="text-yellow-500 cursor-pointer hover:text-yellow-400"
          onClick={() => setIsWithdrawalModalOpen(false)}
        />
      </div>

      <p className="text-sm text-yellow-300 mt-2">
        Enter the amount you wish to withdraw. Requests are processed within
        0–8 hours.
      </p>

      {/* Wallet Selection */}
      <div className="w-full mt-6">
        <label className="block text-yellow-500 font-medium mb-1">
          Select Wallet
        </label>
        <Select
          options={[
            { label: "R&B Wallet", value: "R&B" },
            { label: "ROI Wallet", value: "ROI" },
            { label: "Extra Income Wallet", value: "Interest" },
          ]}
          customStyles={customStyles}
          onChange={(val) => handleWithdrawalDataChange("fromWallet", val)}
          value={withdrawalData.fromWallet}
        />
      </div>

      {/* Withdrawal Method */}
      <div className="w-full mt-6">
        <label className="block text-yellow-500 font-medium mb-1">
          Withdrawal Method
        </label>
        <div className="bg-black border border-yellow-500 rounded-md px-3 py-2 text-yellow-400">
          Withdrawal Wallet
        </div>
      </div>

      {/* Amount */}
      <div className="w-full mt-6">
        <label className="block text-yellow-500 font-medium mb-1">
          Enter Amount
        </label>
        <input
          type="text"
          name="amount"
          className="w-full bg-black px-3 py-2 border border-yellow-500 rounded-md text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => handleWithdrawalDataChange("amount", e.target.value)}
          value={withdrawalData.amount}
          placeholder="Enter amount"
        />
      </div>

      {/* Security Pin */}
      <div className="w-full mt-6">
        <label className="block text-yellow-500 font-medium mb-1">
          Security Pin
        </label>
        <input
          type="password"
          name="securityPin"
          className="w-full bg-black px-3 py-2 border border-yellow-500 rounded-md text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-500"
          value={withdrawalData.securityPin}
          onChange={(e) =>
            handleWithdrawalDataChange("securityPin", e.target.value)
          }
          placeholder="Enter your security pin"
        />
      </div>

      {/* OTP */}
      {withdrawalData.isOTPSentForWithdrawal && (
        <div className="w-full mt-6">
          <label className="block text-yellow-500 font-medium mb-1">
            Enter OTP
          </label>
          <input
            type="text"
            name="otp"
            className="w-full bg-black px-3 py-2 border border-yellow-500 rounded-md text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-500"
            value={withdrawalData.otp}
            onChange={(e) => handleWithdrawalDataChange("otp", e.target.value)}
            placeholder="Enter OTP"
          />
        </div>
      )}

      {/* Submit Button */}
      <Button
        className="w-full mt-6 bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-all"
        onClick={handleWithdrawalSubmit}
        loading={withdrawalData.isLoading}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default WithdrawalModal;
