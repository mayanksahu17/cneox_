import React from "react";
import clsx from "clsx";

const TreeNode = ({ name, isSingle, leftCount, rightCount, rounded }) => {
  const formatValue = (name, value) => {
    if (
      name === "Business" ||
      name === "Direct Business" ||
      name === "Matching Due" ||
      name === "Carry" ||
      name === "Binary Due"
    ) {
      return `$${value}`;
    }
    return value;
  };

  return (
    <tr className="divide-x-2 divide-y-2  divide-gray-300 ">
      <td
        className={clsx(
          "px-4 py-0.5  text-redColor font-semibold border-b-2 border-b-gray-300",
          rounded === "bottom" && "rounded-bl"
        )}
      >
        {name}
      </td>

      {isSingle ? (
        <td className="text-center px-4 py-0.5 " colSpan="2">
          {formatValue(name, leftCount)}
        </td>
      ) : (
        <>
          <td className="text-center px-4 py-0.5 ">
            {formatValue(name, leftCount)}
          </td>
          <td className="text-center px-4 py-0.5 ">
            {formatValue(name, rightCount)}
          </td>
        </>
      )}
    </tr>
  );
};

export default TreeNode;
