import { useEffect, useRef, useState } from "react";
import BinaryNode from "./binarytree/BinaryNode";
import { useNavigate } from "react-router-dom";
import BinaryIcons from "./BinaryIcons";

export default function BinaryTree({ data }) {
  const containerRef = useRef(null);
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the middle of the container
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth / 2 -
        containerRef.current.clientWidth / 2;
    }
  }, [data]);

  const getNodeById = (id) => data?.find((el) => el?.i === id);

  return (
    <div className="space-y-6 bg-black text-yellow-500 p-4 rounded-lg ">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black p-4 rounded-lg">
        <p className="text-sm font-medium">
          Search for a specific user in your network
        </p>
        <div className="flex gap-3 w-full md:w-auto">
          <input
            id="user_id"
            className="flex-1 md:w-64 p-2 rounded-md border border-yellow-500 bg-black text-yellow-500 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={inputData}
            name="userId"
            type="text"
            placeholder="Enter User ID"
            onChange={(e) => setInputData(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50"
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

      {data?.length > 0 ? (
        <div
          className="overflow-x-auto py-5 w-full  rounded-lg bg-black"
          ref={containerRef}
        >
          <div className="mx-auto max-w-[100vw] px-[300px] lg:px-0">
            <div className="flex flex-col items-center justify-center scale-[0.85] transform-origin-top">
              <BinaryNode data={getNodeById(1)} first />

              <div className="flex items-center justify-center">
                <div className="h-[2px] bg-yellow-500 w-[400px]" />
              </div>

              <div className="flex gap-[300px]">
                <BinaryNode data={getNodeById(2)} />
                <BinaryNode data={getNodeById(3)} />
              </div>

              <div className="flex relative" style={{ gap: 250, marginTop: 0 }}>
                <div className="h-[2px] bg-yellow-500 absolute w-[210px] right-[95px]" />
                <div className="h-[2px] bg-yellow-500 absolute w-[210px] left-[95px]" />
              </div>

              <div className="flex gap-[100px]">
                <BinaryNode data={getNodeById(4)} side />
                <BinaryNode data={getNodeById(5)} />
                <BinaryNode data={getNodeById(6)} />
                <BinaryNode data={getNodeById(7)} />
              </div>

              <div className="flex relative gap-[110px]">
                <div className="h-[2px] bg-yellow-500 absolute w-[100px] right-[260px]" />
                <div className="h-[2px] bg-yellow-500 absolute w-[100px] right-[50px]" />
                <div className="h-[2px] bg-yellow-500 absolute w-[100px] left-[50px]" />
                <div className="h-[2px] bg-yellow-500 absolute w-[100px] left-[260px]" />
              </div>

              <div className="flex gap-5 px-0">
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
      ) : (
        <div className="py-16 text-center bg-black rounded-lg border border-yellow-500">
          <p className="text-yellow-300">No binary tree data found</p>
        </div>
      )}

      <div className="mt-4">
        <BinaryIcons />
      </div>
    </div>
  );
}
