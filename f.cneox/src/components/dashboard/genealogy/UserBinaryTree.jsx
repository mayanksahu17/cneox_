import { useParams, useNavigate } from "react-router-dom";
import genealogyService from "../../../services/genealogyService";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import BinaryNode from "./binarytree/BinaryNode";
import clsx from "clsx";
import BinaryIcons from "./BinaryIcons";
import { ArrowUp, RefreshCw } from "lucide-react";

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
      // Scroll to the middle of the container
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
          navigate(
            `/dashboard/genealogy/binary/${getNodeById(1)?.parent_id}`
          );
        }
      },
    },
    {
      name: "Reset",
      icon: <RefreshCw size={16} />,
      onClick: () => navigate("/dashboard/genealogy/binary"),
    },
  ];

  if (!isDataLoaded) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (allData.binaryTreeData?.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          The user is not part of your binary tree
        </p>
        <button
          onClick={() => navigate("/dashboard/genealogy/binary")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Back to Your Tree
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            User Binary Tree View
          </h3>
          
          <div className="flex gap-2">
            {buttons.map((el, index) => (
              <button
                key={index}
                onClick={el?.onClick}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-1"
              >
                {el.icon}
                <span>{el.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Search for a specific user in this network
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                id="user_id"
                className="flex-1 md:w-64 p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                value={inputData}
                name="userId"
                type="text"
                placeholder="Enter User ID"
                onChange={(e) => setInputData(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                onClick={() => {
                  if (inputData.trim()) {
                    navigate(`/dashboard/genealogy/binary/${inputData}`);
                  }
                }}
                disabled={!inputData.trim()}
              >
                Search
              </button>
            </div>
          </div>
          
          <div
            className="overflow-x-auto py-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
            ref={containerRef}
          >
            <div className="mx-auto max-w-[100vw] px-[800px] lg:px-0">
              <div className="flex flex-col items-center justify-center">
                <BinaryNode data={getNodeById(1)} first />
                <div className="flex items-center justify-center">
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 w-[528px]" />
                </div>
                <div className="flex gap-[406px]">
                  <BinaryNode data={getNodeById(2)} />
                  <BinaryNode data={getNodeById(3)} />
                </div>
                <div className="flex relative" style={{ gap: 338, marginTop: 0 }}>
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[270px] right-[135px]" />
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[272px] left-[135px]" />
                </div>
                <div className="flex gap-[151px]">
                  <BinaryNode data={getNodeById(4)} side />
                  <BinaryNode data={getNodeById(5)} />
                  <BinaryNode data={getNodeById(6)} />
                  <BinaryNode data={getNodeById(7)} />
                </div>
                <div className="flex relative gap-[157px]">
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[143px] right-[360px]" />
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[145px] right-[71px]" />
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[142px] left-[73px]" />
                  <div className="h-[2px] bg-gray-300 dark:bg-gray-600 absolute w-[145px] left-[360px]" />
                </div>
                <div className="flex gap-6 px-0">
                  <BinaryNode last data={getNodeById(8)} side />
                  <BinaryNode last data={getNodeById(9)} />
                  <BinaryNode last data={getNodeById(10)} />
                  <BinaryNode last data={getNodeById(11)} />
                  <BinaryNode last data={getNodeById(12)} />
                  <BinaryNode last data={getNodeById(13)} />
                  <BinaryNode last data={getNodeById(14)} />
                  <BinaryNode last data={getNodeById(15)} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <BinaryIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
