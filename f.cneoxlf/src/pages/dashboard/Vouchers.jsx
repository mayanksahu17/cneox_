import { useState, useEffect } from "react";
import { FaTicketAlt, FaPlus } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import vouchersService from "../../services/vouchersService";
import toast from "react-hot-toast";
import { AllVouchers, CreateVoucher } from "../../components";
import { motion } from "framer-motion";

export default function Vouchers() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [formData, setFormData] = useState({
    selectedWallet: "",
    amount: 0,
  });
  const [loadingStates, setLoadingStates] = useState({
    isVoucherLoading: false,
  });

  const handleFromDataChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleLoadingState = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const res = await vouchersService.getAllVouchers(user);
      if (res.status === 200) {
        setVouchers(res?.data?.data || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleVoucherSubmit = async () => {
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
        setActiveTab("list");
        fetchVouchers();
        setFormData({ selectedWallet: "", amount: 0 });
      }
    } catch (error) {
      handleLoadingState("isVoucherLoading", false);
      toast.error("Error creating voucher");
    }
  };

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.voucher_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------- Framer Motion Variants ---------- */
  const pageVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.06 } },
  };

  const tabContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const tabItem = {
    hidden: { opacity: 0, y: 6, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: "easeOut" } },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const buttonHover = { scale: 1.03 };

  return (
    <motion.div
      className="w-full bg-black"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Page Header */}
      <motion.div variants={contentItem} className="mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Voucher
        </h1>
        <p className="text-yellow-300">Manage your vouchers</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="rounded-t-lg overflow-hidden bg-black mb-3"
        variants={tabContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex bg-black border border-[#111] rounded-t-lg items-center">
          <motion.button
            variants={tabItem}
            whileHover={buttonHover}
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 py-3 px-4 transition duration-200 rounded-t-md ${
              activeTab === "create"
                ? "bg-black text-yellow-500 border-b-2 border-yellow-500 shadow-sm"
                : "text-yellow-300 hover:text-yellow-500"
            }`}
          >
            <FaPlus className={`${activeTab === "create" ? "text-yellow-500" : "text-yellow-300"}`} />
            <span className={activeTab === "create" ? "text-yellow-500 font-medium" : "text-yellow-300"}>
              Create Voucher
            </span>
          </motion.button>

          <motion.button
            variants={tabItem}
            whileHover={buttonHover}
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 py-3 px-4 transition duration-200 rounded-t-md ${
              activeTab === "list"
                ? "bg-black text-yellow-500 border-b-2 border-yellow-500 shadow-sm"
                : "text-yellow-300 hover:text-yellow-500"
            }`}
          >
            <FaTicketAlt className={`${activeTab === "list" ? "text-yellow-500" : "text-yellow-300"}`} />
            <span className={activeTab === "list" ? "text-yellow-500 font-medium" : "text-yellow-300"}>
              Vouchers List
            </span>
          </motion.button>

          {/* Search on the right */}
          <div className="ml-auto flex items-center gap-2 px-4">
            <motion.input
              variants={tabItem}
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search voucher id..."
              className="px-3 py-2 rounded-md bg-[#0b0b0b] border border-[#1b1b1b] text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={contentItem} className="bg-black border border-[#111] rounded-b-lg p-5 mt-0 text-yellow-200">
        {activeTab === "list" ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {/* AllVouchers component can accept a containerClassName which will be animated wrapper for list cards */}
            <AllVouchers
              vouchers={filteredVouchers}
              fetchVouchers={fetchVouchers}
              containerClassName="bg-[#070707] border border-[#151515] rounded-md"
              emptyTextClassName="text-yellow-400"
              // If AllVouchers renders voucher cards itself, it should be left as-is;
              // Here we wrap with a motion.div just to animate the container
            />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <CreateVoucher
              formData={formData}
              onFormChange={handleFromDataChange}
              onSubmit={handleVoucherSubmit}
              loading={loadingStates.isVoucherLoading}
              submitButtonClassName="bg-yellow-500 text-black hover:bg-yellow-600"
              formClassName="bg-[#070707] border border-[#151515] rounded-md p-4"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
