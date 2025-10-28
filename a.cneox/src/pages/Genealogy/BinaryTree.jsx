import React from "react";
import BinaryNode from "./BinaryTree/BinaryNode";
import BinaryIcons from "./BinaryIcons";
const BinaryTree = ({ data }) => {
  const getNodeById = (id) => data?.find((el) => el?.i === id);

  return (
    <div className="w-full px-[800px] lg:px-0 ">
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
      <BinaryIcons />
    </div>
  );
};

export default BinaryTree;
