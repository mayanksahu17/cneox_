const UniqueColumnData = ({ item, row }) => {
  const greenDataFields = [
    "investment",
    "deposit",
    "total_deposit_wallet",
    "total_referral_wallet",
    "total_binary_wallet",
    "amount",
    "transaction_date",
    "packages",
    "invested_amount",
    "total_deposit_investment",
    "total_referral_wallet_trade",
    "total_binary_wallet",
    "total_deposit_total_binary_walletwallet_tec",
    "powerleg_investment",
    "free_investment",
    "total_referral_binary_wallet",
    "total_roi_wallet",
    "received_amount",
    "final_amount",
    "deposit_amount",
    "token_amount",
    "total_cash_investment",
    "original_amount",
    "target_amount",
    "total_voucher_investment",
  ];
  const blueDataFields = [
    "cash_investment",
    "token_investment",
    "total_earning",
    "total_investment",
    "total_deposit",
    "charges",
    "crypto_type",
    "amount_sent",
    "amount_received",
    "total_referral_binary_wallet",
    "total_interest_wallet",
  ];
  const redDataFields = [
    "roi-withdrawal",
    "interest-withdrawal",
    "r&b-investment",
    "total_withdrawal",
    "rnb_withdrawal",
    "interest_withdrawal",
    "roi_withdrawal",
  ];
  const currencyFields = [
    "investment",
    "deposit",
    "total_deposit_wallet",
    "total_referral_wallet",
    "total_voucher_investment",
    "total_binary_wallet",
    "amount",
    "total_earning",
    "total_investment",
    "total_deposit",
    "amount_sent",
    "amount_recieved",
    "roi-withdrawal",
    "interest-withdrawal",
    "total_interest_wallet",
    "r&b-investment",
    "total_withdrawal",
    "total_cash_investment",
    "total_referral_binary_wallet",
    "cash_investment",
    "deposit",
    "free_investment",
    "interest_withdrawal",
    "powerleg_investment",
    "rnb_withdrawal",
    "roi_withdrawal",
    "token_investment",
    "received_amount",
    "total_deposit",
    "total_withdrawal",
    "total_referral_wallet_trade",
    "total_deposit_investment",
    "invested_amount",
    "deposit_amount",
    "token_amount",
    "amount_received",
    "amount_sent",
    "reward_amount",

    "total_referral_binary_wallet",
    "total_roi_wallet",
    "received_amount",
    "final_amount",

    "original_amount",
    "target_amount",
  ];

  const getValueFromNestedProperty = (object, path) => {
    const keys = path.split(".");
    return keys.reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""),
      object
    );
  };

  const extractValue = () => {
    const value = getValueFromNestedProperty(item, row.field);
    return value !== undefined ? value : "";
  };

  const shouldAddDollarSign = currencyFields.includes(row.field);

  return greenDataFields.includes(row.field) ? (
    <td
      className={`p-4  text-sm font-semibold text-greenColor ${
        shouldAddDollarSign ? "currency" : ""
      }`}
    >
      {shouldAddDollarSign && "$"}
      {extractValue() || "00.00"}
    </td>
  ) : blueDataFields.includes(row.field) ? (
    <td
      className={`p-4  text-sm font-semibold text-blueColor ${
        shouldAddDollarSign ? "currency" : ""
      }`}
    >
      {shouldAddDollarSign && "$"}
      {extractValue() || "00.00"}
    </td>
  ) : redDataFields.includes(row.field) ? (
    <td
      className={`p-4  text-sm font-semibold text-redColor ${
        shouldAddDollarSign ? "currency" : ""
      }`}
    >
      {shouldAddDollarSign && "$"}
      {extractValue() || "00.00"}
    </td>
  ) : (
    <td
      className={`p-4  text-sm text-textColor font-normal ${
        shouldAddDollarSign ? "currency" : ""
      }`}
    >
      {shouldAddDollarSign && "$"}
      {extractValue()}
    </td>
  );
};

export default UniqueColumnData;
