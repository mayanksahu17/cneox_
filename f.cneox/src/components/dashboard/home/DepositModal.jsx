import React from "react";

const DepositModal = () => {
  const [inputs, setInputs] = useState({
    fromCurrencyCode: "",
    fromAmount: "",
    toCurrencyCode: "",
    toAmount: "",
    isWithdrawalModalOpen: false,
    isReInvestModalOpen: false,
    depositAmount: 0,
    selectedDepositCurrency: {
      label: "",
      value: "",
    },
    isDepositLoading: false,
  });

  const handleInputsChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDepositSubmit = async () => {
    try {
      handleInputsChange("isDepositLoading", true);
      const depositResponse = await depositService.makeDeposit({
        from_currency: "USD",
        to_currency: inputs.selectedDepositCurrency?.value,
        amount: inputs.depositAmount,
        buyer_name: user?.user?.name,
        buyer_email: user?.user?.email,
        custom: `["${user?.user?.userId}","${inputs.selectedDepositCurrency?.value}"]`,
        ipn_endpoint: "/api/payment/deposit/ipn",
        email: user?.user?.email,
      });

      if (depositResponse.data.success) {
        handleInputsChange("isDepositLoading", false);
        handleInputsChange("isReInvestModalOpen", false);
        window.open(depositResponse.data.data.checkout_url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={inputs.isReInvestModalOpen}
      handleClose={() => handleInputsChange("isReInvestModalOpen", false)}
    >
      <div className="flex items-center justify-end">
        <IoClose
          size="20"
          className="text-black cursor-pointer"
          onClick={() => handleInputsChange("isReInvestModalOpen", false)}
        />
      </div>
      <div className="w-full">
        <p className="text-2xl text-gray-700 font-semibold leading-tighter">
          Deposit Fund
        </p>
        <p className="text-base">
          Enter the amount you wish to deposit to your account. Please note that
          the desposit process may take a few business days.
        </p>
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">
          Enter Amount ($)
        </label>
        <input
          type="text"
          name="confirmEmail"
          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
          placeholder="$100,000"
          value={inputs.depositAmount}
          onChange={(e) => handleInputsChange("depositAmount", e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">
          Select Cryptocurrency
        </label>
        <Select
          options={tokens}
          customStyles={customStyles}
          value={inputs.selectedDepositCurrency}
          onChange={(value) =>
            handleInputsChange("selectedDepositCurrency", value)
          }
        />
      </div>
      <Button
        className="mt-3"
        onClick={handleDepositSubmit}
        loading={inputs.isDepositLoading}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default DepositModal;
