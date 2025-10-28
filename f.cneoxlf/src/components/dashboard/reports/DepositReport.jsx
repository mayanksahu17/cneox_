import { reportDepositColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    transactionId: el?.txn_id,
    cryptoType: el?.crypto_type,
  }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportDepositColumns}
        data={formattedData}
        heading="Deposit Transactions"
      />
    </div>
  );
}
