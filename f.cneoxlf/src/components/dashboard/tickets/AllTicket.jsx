import clsx from "clsx";
import { IoTicketSharp } from "react-icons/io5";
import { ticketColumns } from "../../../constants/Column";
import Table from "../global/Table";
import { useAuth } from "../../../hooks/useAuth";
import ticketService from "../../../services/ticketService";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function AllTicket() {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    allTickets: [],
  });

  const handleAllDataChange = async (name, value) => {
    setAllData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const res = await ticketService.getAllTicketsByUserId(user);

          if (res.status === 200) {
            handleAllDataChange("allTickets", res?.data?.data);
          }

          console.log(res);
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }
    })();
  }, [user]);

  const { openTicketsCount, closedTicketsCount } = useMemo(() => {
    const openCount = allData.allTickets.filter(
      (ticket) => ticket.status === "Open"
    ).length;
    const closedCount = allData.allTickets.filter(
      (ticket) => ticket.status === "Closed"
    ).length;

    return {
      openTicketsCount: openCount,
      closedTicketsCount: closedCount,
    };
  }, [allData.allTickets]);

  const data = [
    {
      name: "All Tickets",
      amount: allData.allTickets?.length || 0,
      icon: IoTicketSharp,
      color: "#f0932b",
    },
    {
      name: "Open Tickets",
      amount: openTicketsCount || 0,
      icon: IoTicketSharp,
      color: "#be2edd",
    },
    {
      name: "Closed Tickets",
      amount: closedTicketsCount || 0,
      icon: IoTicketSharp,
      color: "#22a6b3",
    },
  ];

  return (
    <div className="w-full mt-4 text-black dark:text-white">
      <h4 className="text-xl">All Tickets</h4>

      <Table
        columns={ticketColumns}
        data={allData.allTickets}
        className="mt-6"
      />
    </div>
  );
}
