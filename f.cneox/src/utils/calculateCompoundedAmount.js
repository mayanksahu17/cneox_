export const calculateCompoundedAmount = (principal, rate, days) => {
  const rateDecimal = parseFloat(rate?.replace("%", "")) / 100;
  const interest = principal * rateDecimal * days;
  return principal + interest;
};
