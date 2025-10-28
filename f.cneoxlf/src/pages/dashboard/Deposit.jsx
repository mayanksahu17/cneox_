import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../../components/dashboard/global/Button";
import { Select } from "../../components";
import { tokens } from "../../constants/tokens";
import depositService from "../../services/depositService";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--bg-primary, white)",
    border: "1px solid var(--border-color, #e2e8f0)",
    borderRadius: "8px",
    padding: "1px",
    fontWeight: "400",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "var(--border-hover, #cbd5e1)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--bg-primary, white)",
    border: "1px solid var(--border-color, #e2e8f0)",
    borderRadius: "6px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? "var(--primary-color, #3b82f6)" 
      : state.isFocused 
        ? "var(--hover-bg, #f8fafc)" 
        : "transparent",
    color: state.isSelected 
      ? "white" 
      : "var(--text-primary, #1e293b)",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: state.isSelected 
        ? "var(--primary-color, #3b82f6)" 
        : "var(--hover-bg, #f8fafc)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text-primary, #1e293b)",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--text-primary, #1e293b)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-secondary, #64748b)",
  }),
};

export default function Deposit() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: "",
    selectedCurrency: null,
    isLoading: false,
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async () => {
  if (!formData.amount || !formData.selectedCurrency) {
    toast.error("Please fill all fields");
    return;
  }

  if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
    toast.error("Please enter a valid amount");
    return;
  }

  try {
    function generateInvestmentId() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
  return `${randomNumber}`;
}

    handleChange("isLoading", true);
    const depositResponse = await depositService.makeDeposit({
      from_currency: "USD",
      to_currency: formData.selectedCurrency?.value,
      amount: parseFloat(formData.amount),
      buyer_name: user?.user?.name,
      buyer_email: user?.user?.email,
      custom: JSON.stringify([
        user?.user?.userId,        // user_id
        "self",                    // type: self or downline
        "NA",                      // sponsor: NA for self
        generateInvestmentId(),                      // package_id (use real ID if needed)
        formData.amount,           // invested_amount
        formData.amount,           // deposit_amount
        "0",                       // voucher_amount
        "NA"                       // voucher_id
      ]),
      ipn_endpoint: "/api/payment/deposit/ipn",
      email: user?.user?.email,
    });

    if (depositResponse.data.success) {
      toast.success("Redirecting to payment gateway");
      window.open(depositResponse.data.data.checkout_url, "_blank");
      setFormData({
        amount: "",
        selectedCurrency: null,
        isLoading: false,
      });
    }
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    handleChange("isLoading", false);
  }
};


  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Deposit Funds</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Deposit funds to your account to activate packages or enhance your investment potential.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Enter Amount (USD)
            </label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="Enter amount, e.g. 100"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2
                       focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Select Cryptocurrency
            </label>
            <Select
              options={tokens}
              customStyles={customStyles}
              value={formData.selectedCurrency}
              onChange={(value) => handleChange("selectedCurrency", value)}
              placeHolder="Select cryptocurrency"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Important Information</h3>
            <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>The minimum deposit amount is $25.</li>
              <li>Your deposit will be credited to your Deposit Wallet after confirmation.</li>
              <li>Use funds from your Deposit Wallet to activate investment packages.</li>
              <li>Transaction confirmations may take 10-30 minutes depending on the blockchain network.</li>
            </ul>
          </div>

          <Button
            className="w-full py-3 text-lg"
            onClick={handleSubmit}
            loading={formData.isLoading}
            disabled={!formData.amount || !formData.selectedCurrency}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-medium">Enter Amount</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Choose the amount you wish to deposit in USD.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-medium">Select Cryptocurrency</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Choose which cryptocurrency you want to use for the deposit.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-medium">Complete Payment</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Send your cryptocurrency to the provided address to complete the transaction.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 font-bold">4</span>
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-gray-200 font-medium">Start Investing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Once your deposit is confirmed, the funds will be added to your Deposit Wallet for investing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 