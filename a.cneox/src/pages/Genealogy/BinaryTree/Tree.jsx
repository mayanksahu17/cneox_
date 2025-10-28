import React from "react";
import TreeNode from "./TreeNode";

const Tree = ({ data }) => {
  return (
    <div className=" p-6 border border-solid rounded-md border-gray-300 flex justify-center align-center bg-white shadow-lg w-[32rem] ">
      <table className="w-full rounded-md text-gray-400  bg-white border border-gray-300 ">
        <thead className="">
          <tr className="divide-x-2  divide-gray-300 ">
            <th className=" w-1/3 text-center  rounded-sm   px-4 py-1  font-medium text-textColor bg-gray-200  border-b-2 border-b-gray-300">
              {data?.name || ""}
            </th>
            <th className="w-1/3 text-center px-4 py-1    font-medium text-textColor bg-gray-200">
              Left
            </th>
            <th className="w-1/3 text-center px-4 py-1    font-medium text-textColor bg-gray-200">
              Right
            </th>
            {/* <th className="w-1/3 text-center px-4 py-1   rounded-tr text-transparent bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text font-semibold">Right</th> */}
          </tr>
        </thead>
        <tbody className="">
          <TreeNode
            name="Downlines"
            leftCount={data && data.left_downlines ? data.left_downlines : "0"}
            rightCount={
              data && data.right_downlines ? data.right_downlines : "0"
            }
          />
          <TreeNode
            name="Business"
            leftCount={data && data.left_business ? data.left_business : "0.00"}
            rightCount={
              data && data.right_business ? data.right_business : "0.00"
            }
          />
          <TreeNode
            name="Carry"
            leftCount={data && data.left_carry ? data.left_carry : "0.00"}
            rightCount={data && data.right_carry ? data.right_carry : "0.00"}
          />

          <TreeNode
            isSingle={true}
            name="Matching Due"
            leftCount={data && data.matching_due ? data.matching_due : "0.00"}
          />
          <TreeNode
            isSingle={true}
            name="Binary Due"
            leftCount={data && data.binary_due ? data.binary_due : "0.00"}
          />
          <TreeNode
            isSingle={true}
            name="Capping Limit"
            leftCount={data && data.capping_limit ? data.capping_limit : "0.00"}
            rounded="bottom"
          />
        </tbody>
      </table>
    </div>
  );
};

export default Tree;
