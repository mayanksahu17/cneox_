import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Select from "../global/Select";
import { tokens } from "../../../constants/tokens";
import Button from "../global/Button";
import withdrawalService from "../../../services/withdrawalService";
import walletAddressService from "../../../services/walletAddressService";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

const TransferModal = ({ setIsTransferModalOpen, isTransferModalOpen }) => {
  const { user } = useAuth();
  const [transferData, setTransferData] = useState({
    isOTPSentForTransfer: false,
    amount: 0,
    from_wallet: "ROI",
    toUserId: "",
    fromUserId: "",
    to_wallet: "ROI",
    securityPin: "",
    otp: "",
    isLoading: false,
  });
  const [downlines, setDownlines] = useState([]);
  const handleTransferDataChange = (name, value) =>
    setTransferData((prev) => ({ ...prev, [name]: value }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: "400",
    }),
    option: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: "400",
      cursor: "pointer",
    }),
  };
  useEffect(() => {
    console.log("first");

    (async () => {
      console.log("second");
      try {
        const res = await walletAddressService.getUserDownlineInfo(user);
        console.log(res);
        if (res?.data?.success) {
          // Add the new fields to each object in the array
          const modifiedDownlines = res.data.data.map((item) => ({
            ...item,
            value: item.userId,
            label: `${item.userId}-${item.name}-${item.country}`,
          }));
          setDownlines(modifiedDownlines);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    })();
  }, []);
  const handleTransferSubmit = async () => {
    if (
      Number(user?.user?.security_pin) !== Number(transferData?.securityPin)
    ) {
      toast.error("Invalid security pin");
      return;
    }

    try {
      if (!transferData.isOTPSentForTransfer) {
        handleTransferDataChange("isLoading", true);
        const res = await withdrawalService.sentOTP(user);

        if (res.status === 200) {
          handleTransferDataChange("isLoading", false);
          handleTransferDataChange("isOTPSentForTransfer", true);
        }
      } else {
        const tempData = {
          amount: transferData.amount,
          to_wallet: transferData?.to_wallet?.value,
          from_wallet: transferData?.from_wallet?.value,
          security_pin: transferData.securityPin,
          toUserId: transferData?.toUserId?.value,
          fromUserId: transferData?.fromUserId?.value,
          otp: transferData.otp,
        };

        handleTransferDataChange("isLoading", true);
        const res = await walletAddressService.createInterWalletTransfer(
          user,
          tempData
        );

        if (res?.data?.success) {
          handleTransferDataChange("isLoading", false);
          toast.success("Transfer created successfully");
          setTransferData({
            isOTPSentForTransfer: false,
            amount: 0,
            from_wallet: "ROI",
            toUserId: "",
            fromUserId: "",
            to_wallet: "ROI",
            securityPin: "",
            otp: "",
            isLoading: false,
          });
          setIsTransferModalOpen(false);
        }
      }
    } catch (error) {
      handleTransferDataChange("isLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
    }
  };
  return (
    <Modal
      isOpen={isTransferModalOpen}
      handleClose={() => {
        setIsTransferModalOpen(false);
      }}
    >
      <div className="flex flex-col items-center justify-end mt-4 text-white">
        <div className="flex items-center justify-end w-full">
          <IoClose
            size="20"
            className="text-black cursor-pointer"
            onClick={() => {
              setTransferData({
                isOTPSentForTransfer: false,
                amount: 0,
                from_wallet: "ROI",
                toUserId: "",
                fromUserId: "",
                to_wallet: "ROI",
                securityPin: "",
                otp: "",
                isLoading: false,
              });
              setIsTransferModalOpen(false);
            }}
          />
        </div>
        <div className="w-full">
          <p className="text-2xl font-semibold text-white leading-tighter">
            Transfer Fund
          </p>
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">From Wallet</label>
          <Select
            options={[
              {
                label: "R&B Wallet",
                value: "R&B",
              },
              {
                label: "ROI Wallet",
                value: "ROI",
              },
              {
                label: "Extra Income Wallet",
                value: "Interest",
              },
            ]}
            customStyles={customStyles}
            onChange={(val) => handleTransferDataChange("from_wallet", val)}
            value={transferData.from_wallet}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">To Wallet</label>
          <Select
            options={[
              {
                label: "R&B Wallet",
                value: "R&B",
              },
              {
                label: "ROI Wallet",
                value: "ROI",
              },
              {
                label: "Extra Income Wallet",
                value: "Interest",
              },
            ]}
            customStyles={customStyles}
            onChange={(val) => handleTransferDataChange("to_wallet", val)}
            value={transferData.to_wallet}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">Enter Amount</label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-2 border rounded-md text-black border-solid border-slate-200 outline-none mt-1 !ml-0"
            onChange={(e) => handleTransferDataChange("amount", e.target.value)}
            value={transferData.amount}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">From user</label>
          <Select
            options={downlines}
            customStyles={customStyles}
            onChange={(val) => handleTransferDataChange("fromUserId", val)}
            value={transferData.fromUserId}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">To user</label>
          <Select
            options={downlines}
            customStyles={customStyles}
            onChange={(val) => handleTransferDataChange("toUserId", val)}
            value={transferData.toUserId}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">
            Enter Your Security Pin
          </label>
          <input
            type="text"
            name="securityPin"
            className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 text-black outline-none mt-1 !ml-0"
            value={transferData.securityPin}
            onChange={(e) =>
              handleTransferDataChange("securityPin", e.target.value)
            }
          />
        </div>

        {transferData.isOTPSentForTransfer && (
          <div className="w-full mt-4">
            <label className="block text-[#fff] font-normal">Enter OTP</label>
            <input
              type="text"
              name="otp"
              className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 text-black !ml-0"
              value={transferData.otp}
              onChange={(e) => handleTransferDataChange("otp", e.target.value)}
            />
          </div>
        )}
        <Button
          className="mt-3"
          onClick={handleTransferSubmit}
          loading={transferData.isLoading}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default TransferModal;
