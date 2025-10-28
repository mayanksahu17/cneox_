import { reportsTokenColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    transactionId: el?.txn_id,
    tokenType: el?.token_type,
  }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportsTokenColumns}
        data={formattedData}
        heading="Token Transactions"
      />
    </div>
  );
}
