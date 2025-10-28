import { useEffect, useState } from "react";
import { GitBranch, Users, UserPlus } from "lucide-react";
import { BinaryTree, Referral } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import genealogyService from "../../services/genealogyService";
import { motion } from "framer-motion";

export default function Genealogy() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Referral");
  const [allData, setAllData] = useState({
    allBinaryData: [],
    allReferralData: [],
  });

  const handleAllDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [binaryTreeResponse, referralResponse] = await Promise.all([
          genealogyService.getBinaryTreeData(user),
          genealogyService.getReferralData(user),
        ]);

        if (binaryTreeResponse?.data?.success)
          handleAllDataChange("allBinaryData", binaryTreeResponse.data.data);

        if (referralResponse?.data?.success)
          handleAllDataChange("allReferralData", referralResponse.data.data);
      } catch (error) {
        console.error("Genealogy Fetch Error:", error);
      }
    })();
  }, [user]);

  const totalNetwork = allData.allReferralData?.length || 0;
  const directReferrals =
    allData.allReferralData?.filter((ref) => ref?.referral?.level === 1)
      .length || 0;
  const networkDepth =
    allData.allReferralData?.reduce(
      (max, ref) => Math.max(max, ref?.referral?.level || 0),
      0
    ) || 0;

  // =========================
  // 🎬 Animation Variants
  // =========================
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const tabContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const tabItem = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    hover: { scale: 1.08, color: "#facc15", transition: { type: "spring", stiffness: 300 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const statCardContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const statCardItem = {
    hidden: { opacity: 0, y: 12, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(250,204,21,0.4)",
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <motion.div
      className="space-y-6 bg-black text-yellow-500 p-4 rounded-lg min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tabs */}
      <motion.div
        className="flex border-b border-yellow-500"
        variants={tabContainer}
        initial="hidden"
        animate="visible"
      >
        {["Referral", "Binary Tree"].map((tab) => (
          <motion.button
            key={tab}
            variants={tabItem}
            whileHover="hover"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 font-medium text-sm transition duration-200 ${
              activeTab === tab
                ? "border-b-2 border-yellow-500 text-yellow-500 font-semibold"
                : "text-yellow-300 hover:text-yellow-500"
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Referral Tab */}
      {activeTab === "Referral" && (
        <motion.div
          className="bg-black border border-yellow-500 rounded-lg p-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            className="text-lg font-semibold tracking-wide mb-4 text-yellow-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Referral Network
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Referral data={allData.allReferralData} />
          </motion.div>
        </motion.div>
      )}

      {/* Binary Tree Tab */}
      {activeTab === "Binary Tree" && (
        <motion.div
          className="bg-black border border-yellow-500 rounded-lg p-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            className="text-lg font-semibold tracking-wide text-yellow-500 mb-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Network Structure
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <BinaryTree data={allData.allBinaryData} />
          </motion.div>
        </motion.div>
      )}

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        variants={statCardContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={statCardItem} whileHover="hover">
          <StatCard
            icon={<Users className="text-black" size={18} />}
            label="Total Network"
            value={totalNetwork}
            growth="+12%"
          />
        </motion.div>

        <motion.div variants={statCardItem} whileHover="hover">
          <StatCard
            icon={<UserPlus className="text-black" size={18} />}
            label="Direct Referrals"
            value={directReferrals}
            growth="+8%"
          />
        </motion.div>

        <motion.div variants={statCardItem} whileHover="hover">
          <StatCard
            icon={<GitBranch className="text-black" size={18} />}
            label="Network Depth"
            value={networkDepth}
            growth="+5%"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ==========================
// ⚡ Black & Yellow Stat Card
// ==========================
function StatCard({ icon, label, value, growth }) {
  return (
    <motion.div
      className="bg-black border border-yellow-500 rounded-lg p-6 cursor-pointer"
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 25px rgba(250,204,21,0.4)",
        transition: { type: "spring", stiffness: 200 },
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-yellow-500">{label}</h3>
      </motion.div>

      <motion.div
        className="text-3xl font-bold text-yellow-500"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {value}
      </motion.div>

      <motion.div
        className="flex items-center mt-2 text-sm"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <span className="text-yellow-400 font-medium">{growth}</span>
        <span className="ml-2 text-yellow-300 opacity-80">from last month</span>
      </motion.div>
    </motion.div>
  );
}
