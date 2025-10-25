import { useState } from "react";
import Button from "../global/Button";
import CustomSelect from "../global/CustomSelect";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateVoucher() {
  const { user } = useAuth();
  const handleNavigate = useNavigate();
  const MIN_VOUCHER_AMOUNT = 12.5;

  const [formData, setFormData] = useState({
    selectedWallet: "",
    amount: 0,
  });

  const [formErrors, setFormErrors] = useState({
    amount: "",
  });

  const [loadingStates, setLoadingStates] = useState({
    isVoucherLoading: false,
  });

  const handleFromDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate amount if that's the field being changed
    if (name === "amount") {
      validateAmount(value);
    }
  };

  const validateAmount = (amount) => {
    if (!amount) {
      setFormErrors(prev => ({ ...prev, amount: "Amount is required" }));
      return false;
    }
    
    if (parseFloat(amount) < MIN_VOUCHER_AMOUNT) {
      setFormErrors(prev => ({ ...prev, amount: `Minimum voucher amount is $${MIN_VOUCHER_AMOUNT}` }));
      return false;
    }
    
    setFormErrors(prev => ({ ...prev, amount: "" }));
    return true;
  };

  const handleLoadingState = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  const validateForm = () => {
    const amountValid = validateAmount(formData.amount);
    
    if (!formData.selectedWallet) {
      toast.error("Please select a wallet");
      return false;
    }
    
    return amountValid;
  };

  const handleVoucherSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      handleLoadingState("isVoucherLoading", true);
      const res = await vouchersService.createVoucher(user, {
        userId: user?.user?.userId,
        wallet: formData.selectedWallet?.value,
        amount: formData.amount,
        email: user?.user?.email,
      });
      if (res.status === 201) {
        handleLoadingState("isVoucherLoading", false);
        toast.success("Voucher created successfully");
        handleNavigate("/dashboard/vouchers/all");
        setFormData({
          selectedWallet: "",
          amount: 0,
        });
      }
    } catch (error) {
      console.log(error);
      handleLoadingState("isVoucherLoading", false);
      toast.error("Error creating voucher");
    }
  };

  return (
    <div className="bg-white dark:bg-[#2D3748] p-6 rounded-lg max-w-2xl mx-auto shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Generate Voucher Card
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Enter Amount <span className="text-sm text-gray-500">(Min: ${MIN_VOUCHER_AMOUNT})</span>
        </label>
        <input
          type="number"
          className={`w-full bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white px-4 py-2 rounded-md border ${
            formErrors.amount 
              ? "border-red-500 focus:ring-red-500" 
              : "border-gray-300 dark:border-gray-700 focus:ring-green-500"
          } focus:outline-none focus:ring-1`}
          onChange={(e) => handleFromDataChange("amount", e.target.value)}
          value={formData.amount}
          min={MIN_VOUCHER_AMOUNT}
          step="0.5"
        />
        {formErrors.amount && (
          <p className="mt-1 text-sm text-red-500">{formErrors.amount}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Select Wallet
        </label>
        <CustomSelect
          options={[
            { label: "R&B Wallet", value: "rnb" },
            { label: "ROI Wallet", value: "roi" },
            { label: "Extra Income Wallet", value: "interest" },
          ]}
          placeHolder="Select Wallet"
          handleChange={(value) =>
            handleFromDataChange("selectedWallet", value)
          }
          value={formData.selectedWallet}
          className="bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
        />
      </div>

      <Button
        className="w-full bg-green-500 hover:bg-green-600"
        loading={loadingStates.isVoucherLoading}
        onClick={handleVoucherSubmit}
        disabled={!!formErrors.amount || !formData.selectedWallet}
      >
        Generate Voucher
      </Button>
    </div>
  );
}
