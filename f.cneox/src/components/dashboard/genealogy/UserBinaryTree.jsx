import { useParams, useNavigate } from "react-router-dom";
import genealogyService from "../../../services/genealogyService";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import BinaryNode from "./binarytree/BinaryNode";
import clsx from "clsx";
import BinaryIcons from "./BinaryIcons";
import { ArrowUp, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function UserBinaryTree() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [inputData, setInputData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  if (userId < user?.user?.userId) {
    return null;
  }

  const [allData, setAllData] = useState({
    binaryTreeData: [],
    selectedButton: "",
  });

  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth / 2 -
        containerRef.current.clientWidth / 2;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsDataLoaded(false);
      try {
        const response = await genealogyService.getBinaryTreeDataById(
          userId,
          user
        );
        setAllData((prev) => ({ ...prev, binaryTreeData: response?.data?.data }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoaded(true);
      }
    })();
  }, [userId, user]);

  const getNodeById = (id) =>
    allData?.binaryTreeData.find((el) => el?.i === id);

  const buttons = [
    {
      name: "Upline",
      icon: <ArrowUp size={16} />,
      onClick: () => {
        if (user?.user?.userId === getNodeById(1)?.parent_id) {
          navigate("/dashboard/genealogy/binary");
        } else {
          navigate(`/dashboard/genealogy/binary/${getNodeById(1)?.parent_id}`);
        }
      },
    },
    {
      name: "Reset",
      icon: <RefreshCw size={16} />,
      onClick: () => navigate("/dashboard/genealogy/binary"),
    },
  ];

  /* ========== Framer Motion Variants ========== */
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05 },
  };

  const nodeVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  /* ========== Conditional Renders ========== */
  if (!isDataLoaded) {
    return (
      <div className="flex justify-center items-center h-60 bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (allData.binaryTreeData?.length === 0) {
    return (
      <motion.div
        className="bg-black border border-yellow-500 rounded-lg p-6 text-center text-yellow-500"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p>The user is not part of your binary tree</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard/genealogy/binary")}
          className="mt-4 px-5 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition"
        >
          Back to Your Tree
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6 bg-black text-yellow-500 min-h-screen p-4 rounded-lg border border-yellow-500"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="rounded-lg border border-yellow-500" variants={sectionVariants}>
        {/* Header */}
        <motion.div
          className="p-6 border-b border-yellow-500 flex justify-between items-center"
          variants={sectionVariants}
        >
          <h3 className="text-lg font-semibold">User Binary Tree View</h3>

          <motion.div
            className="flex gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {buttons.map((el, index) => (
              <motion.button
                key={index}
                variants={buttonVariants}
                whileHover="hover"
                onClick={el?.onClick}
                className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 flex items-center gap-1 transition"
              >
                {el.icon}
                <span>{el.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div className="p-6" variants={sectionVariants}>
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black border border-yellow-500 p-4 rounded-lg mb-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p className="text-sm font-medium" variants={sectionVariants}>
              Search for a specific user in this network
            </motion.p>

            <motion.div className="flex gap-3 w-full md:w-auto" variants={sectionVariants}>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="user_id"
                className="flex-1 md:w-64 p-2 rounded-md border border-yellow-500 bg-black text-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={inputData}
                name="userId"
                type="text"
                placeholder="Enter User ID"
                onChange={(e) => setInputData(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition disabled:opacity-60"
                onClick={() => {
                  if (inputData.trim()) {
                    navigate(`/dashboard/genealogy/binary/${inputData}`);
                  }
                }}
                disabled={!inputData.trim()}
              >
                Search
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Binary Tree Visualization */}
          <motion.div
            className="overflow-x-auto py-10 border border-yellow-500 rounded-lg bg-black"
            ref={containerRef}
            variants={sectionVariants}
          >
            <motion.div
              className="mx-auto max-w-[100vw] px-[800px] lg:px-0"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div className="flex flex-col items-center justify-center" variants={nodeVariants}>
                {/* Root Node */}
                <motion.div variants={nodeVariants}>
                  <BinaryNode data={getNodeById(1)} first />
                </motion.div>

                {/* First Level */}
                <motion.div
                  className="flex items-center justify-center"
                  variants={nodeVariants}
                >
                  <div className="h-[2px] bg-yellow-500 w-[528px]" />
                </motion.div>

                <motion.div className="flex gap-[406px]" variants={nodeVariants}>
                  <BinaryNode data={getNodeById(2)} />
                  <BinaryNode data={getNodeById(3)} />
                </motion.div>

                {/* Second Level */}
                <motion.div className="flex relative" style={{ gap: 338, marginTop: 0 }} variants={nodeVariants}>
                  <div className="h-[2px] bg-yellow-500 absolute w-[270px] right-[135px]" />
                  <div className="h-[2px] bg-yellow-500 absolute w-[272px] left-[135px]" />
                </motion.div>

                <motion.div className="flex gap-[151px]" variants={nodeVariants}>
                  <BinaryNode data={getNodeById(4)} side />
                  <BinaryNode data={getNodeById(5)} />
                  <BinaryNode data={getNodeById(6)} />
                  <BinaryNode data={getNodeById(7)} />
                </motion.div>

                {/* Last Level */}
                <motion.div className="flex relative gap-[157px]" variants={nodeVariants}>
                  <div className="h-[2px] bg-yellow-500 absolute w-[143px] right-[360px]" />
                  <div className="h-[2px] bg-yellow-500 absolute w-[145px] right-[71px]" />
                  <div className="h-[2px] bg-yellow-500 absolute w-[142px] left-[73px]" />
                  <div className="h-[2px] bg-yellow-500 absolute w-[145px] left-[360px]" />
                </motion.div>

                <motion.div className="flex gap-6 px-0" variants={nodeVariants}>
                  {[8, 9, 10, 11, 12, 13, 14, 15].map((id) => (
                    <motion.div key={id} variants={nodeVariants}>
                      <BinaryNode last data={getNodeById(id)} side={id % 2 === 0} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="mt-6" variants={sectionVariants}>
            <BinaryIcons />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
