import clsx from "clsx";

export default function TreeNode({
  name,
  isSingle,
  leftCount,
  rightCount,
  rounded,
  highlighted,
}) {
  const formatValue = (name, value) => {
    if (
      name === "Business" ||
      name === "Total Business" ||
      name === "Level Business" ||
      name === "Direct Business" ||
      name === "Matching Due" ||
      name === "Carry" ||
      name === "Binary Due"
    ) {
      return `$${value}`;
    }
    return value;
  };

  // Add distinct styling for different business types
  const getRowStyle = (name, highlighted) => {
    if (name === "Total Business") {
      return highlighted 
        ? "bg-amber-50 font-medium border-l-4 border-l-amber-500" 
        : "bg-gray-50 font-medium";
    }
    if (name === "Level Business") {
      return highlighted 
        ? "bg-blue-50 font-medium border-l-4 border-l-blue-500" 
        : "bg-blue-50 font-medium";
    }
    return "";
  };

  return (
    <tr className={getRowStyle(name, highlighted)}>
      <td
        className={clsx(
          "p-2 border border-gray-300 text-gray-800 dark:text-gray-200 font-semibold text-xs",
          rounded === "bottom" && "rounded-bl"
        )}
      >
        {name}
      </td>

      {isSingle ? (
        <td className="text-center p-2 border border-gray-300 text-xs text-gray-800 dark:text-gray-200" colSpan="2">
          {formatValue(name, leftCount)}
        </td>
      ) : (
        <>
          <td className="text-center p-2 border border-gray-300 text-xs text-gray-800 dark:text-gray-200 font-medium">
            {formatValue(name, leftCount)}
          </td>
          <td className="text-center p-2 border border-gray-300 text-xs text-gray-800 dark:text-gray-200 font-medium">
            {formatValue(name, rightCount)}
          </td>
        </>
      )}
    </tr>
  );
}
