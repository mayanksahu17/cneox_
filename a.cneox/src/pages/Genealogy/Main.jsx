import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import genealogyService from "../../services/genealogyServices";
import BinaryNode from "./BinaryTree/BinaryNode";
import Loader from "../../component/Loader/Main";
import clsx from "clsx";
import Header from "../../component/ReportsFilter/Header";
import BinaryIcons from "./BinaryIcons";

// Genealogy

const Main = ({ data }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [allData, setAllData] = useState({
    binaryTreeData: [],
    selectedButton: "",
  });
  const handleNavigate = useNavigate();
  const { id } = useParams();

  const [userId, setUserId] = useState("CROWN-100000");

  useEffect(() => {
    if (id) {
      setUserId(id);
    }
  }, [id]);

  const [inputData, setInputData] = useState(userId);

  // console.log(location.pathname);
  useEffect(() => {
    (async () => {
      const response = await genealogyService.getBinaryTreeDataById(userId);
      console.log(response);
      setAllData((prev) => ({ ...prev, binaryTreeData: response?.data?.data }));
      setLoading(false);
    })();
  }, [userId, user]);

  const getNodeById = (id) =>
    allData?.binaryTreeData.find((el) => el?.i === id);

  const buttons = [
    {
      name: "Upline",
      onClick: () => {
        if (user?.user?.userId === getNodeById(1)?.parent_id) {
          handleNavigate("/admin/genealogy/binary");
        } else {
          handleNavigate(
            `/admin/genealogy/binary/${getNodeById(1)?.parent_id}`
          );
        }
      },
    },
    {
      name: "Reset",
      onClick: () => handleNavigate("/admin/genealogy/binary"),
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full px-[800px] max-w-[100vw] lg:px-0 ">
        <div className="flex justify-between items-center">
          <Header headerText={"Binary tree"} />
          <div className="flex items-center gap-4">
            <input
              id="user_id"
              className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
              value={inputData}
              name="userId"
              type="text"
              placeholder="User ID"
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            <button
              className="bg-blueColor px-5 py-1.5 font-medium text-white rounded-md"
              onClick={() => {
                handleNavigate(`/admin/genealogy/binary/${inputData}`);
              }}
            >
              Continue
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md py-12 px-7 mt-7 ring-1 ring-gray-300 w-fit md:w-full relative">
            {allData.binaryTreeData[0]?.user_id !== "OZO-000000" && (
              <div className="absolute flex justify-end top-10 right-10 gap-5">
                {buttons.map((ele, k) => (
                  <button
                    key={k}
                    className="bg-blueColor px-5 py-1.5 font-medium text-white rounded-md"
                    onClick={() => ele.onClick()}
                  >
                    {ele.name}
                  </button>
                ))}
              </div>
            )}
            <BinaryNode data={getNodeById(1)} first />
            <div className="flex items-center justify-center">
              <div className="h-[2px] bg-gray-300 w-[528px]" />
            </div>
            <div className="flex gap-[406px]">
              <BinaryNode data={getNodeById(2)} />
              <BinaryNode data={getNodeById(3)} />
            </div>
            <div className="flex relative " style={{ gap: 338, marginTop: 0 }}>
              <div className="h-[2px] bg-gray-300 absolute w-[270px] right-[135px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[272px] left-[135px]" />
            </div>
            <div className="flex gap-[151px]">
              <BinaryNode data={getNodeById(4)} />
              <BinaryNode data={getNodeById(5)} />
              <BinaryNode data={getNodeById(6)} />
              <BinaryNode data={getNodeById(7)} />
            </div>
            <div className="flex relative gap-[157px]">
              <div className="h-[2px] bg-gray-300 absolute w-[143px] right-[360px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[145px] right-[71px] " />
              <div className="h-[2px] bg-gray-300 absolute w-[142px] left-[73px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[145px] left-[360px]" />
            </div>
            <div className="flex gap-6 px-0">
              <BinaryNode last data={getNodeById(8)} />
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
        <BinaryIcons />
      </div>
    </>
  );
};

export default Main;

/*
 allData.binaryTreeData?.length > 0 && (
      <div className="w-full">
        <div className="flex justify-end w-full items-center py-8 ">
          <div
            className={clsx("flex w-1/6 rounded-lg overflow-hidden  border")}
          >
            {buttons.map((el, index) => (
              <button
                className={clsx(
                  "w-full py-1 border-r bg-textred text-white border-gray-200 hover:bg-[#c7b483] last:border-none font-medium"
                )}
                key={index}
                onClick={el?.onClick}
              >
                {el?.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full px-[800px] max-w-[100vw] lg:px-0 ">
          <div className="flex flex-col items-center justify-center ">
            <BinaryNode data={getNodeById(1)} first />
            <div className="flex items-center justify-center">
              <div className="h-[2px] bg-gray-300 w-[528px]" />
            </div>
            <div className="flex gap-[406px]">
              <BinaryNode data={getNodeById(2)} />
              <BinaryNode data={getNodeById(3)} />
            </div>
            <div className="flex relative " style={{ gap: 338, marginTop: 0 }}>
              <div className="h-[2px] bg-gray-300 absolute w-[270px] right-[135px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[272px] left-[135px]" />
            </div>
            <div className="flex gap-[151px]">
              <BinaryNode data={getNodeById(4)} />
              <BinaryNode data={getNodeById(5)} />
              <BinaryNode data={getNodeById(6)} />
              <BinaryNode data={getNodeById(7)} />
            </div>
            <div className="flex relative gap-[157px]">
              <div className="h-[2px] bg-gray-300 absolute w-[143px] right-[360px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[145px] right-[71px] " />
              <div className="h-[2px] bg-gray-300 absolute w-[142px] left-[73px]" />
              <div className="h-[2px] bg-gray-300 absolute w-[145px] left-[360px]" />
            </div>
            <div className="flex gap-6 px-0">
              <BinaryNode last data={getNodeById(8)} />
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
      </div> */
