import { SubmitTicket, AllTicket, Tab } from "../../components";

export default function Tickets() {
  const data = [
    {
      name: "Submit Ticket",
      route: "/dashboard/tickets/submit-ticket",
      children: <SubmitTicket />,
    },
    {
      name: "All Tickets",
      route: "/dashboard/tickets/all",
      children: <AllTicket />,
    },
  ];

  return (
    <div className="w-full mt-4 text-gray-900 dark:text-gray-100">
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
        <Tab data={data} />
      </div>
    </div>
  );
}
