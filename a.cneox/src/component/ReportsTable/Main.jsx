import React, { useState } from "react";
import { PaginationComponent, ShowEntries, StatusBadge } from "..";
import UniqueColumnData from "./UniqueColumnData.jsx";
import ActionsComp from "./ActionsComp.jsx";
import MultipleValueComp from "./MultipleValueComp.jsx";
import ActionsComp2 from "./ActionsComp2.jsx";

const Main = ({
  columns,
  data,
  hidePagination = false,
  changeRowColor = false,
  renderFunction,
}) => {
  const [tableEntries, setTableEntries] = useState(25);

  // console.log(changeRowColor);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = tableEntries;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data?.slice(firstIndex, lastIndex);
  const npages = Math.ceil(data?.length / recordsPerPage);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {!hidePagination && (
        <div className="mb-4 flex flex-row justify-between items-end flex-wrap gap-4">
          {/* pagination component  */}
          <div>
            <PaginationComponent
              pageIndex={currentPage}
              numofPages={npages}
              prevFunc={prevPage}
              nextFunc={nextPage}
            />
          </div>
          {/* Entries */}
          <div>
            <ShowEntries
              entries={[25, 50, 100]}
              initial={tableEntries}
              setFunc={setTableEntries}
            />
          </div>
        </div>
      )}
      <div className="overflow-auto rounded-lg shadow-lg ">
        <table className="w-full relative">
          <thead className="bg-gray-50 border-b-2 border-gray-200 w-full ">
            <tr className="w-full divide-x divide-gray-300">
              {columns?.map((ele, i) => (
                <th
                  key={i}
                  className={`cursor-pointer w-fit p-3 text-xs text-textColor font-semibold tracking-wide text-left bg-gray-200 uppercase`}
                >
                  {ele.fieldName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 ">
            {records.map((item, i) => (
              <tr
                key={i}
                className={
                  changeRowColor
                    ? `divide-x divide-gray-300 ${
                        item["status_text"] === "Cancelled / Timed Out"
                          ? "bg-yellow-100 bg-opacity-70"
                          : item["status_text"] === "Completed"
                          ? "bg-green-100"
                          : "bg-white"
                      }`
                    : `divide-x divide-gray-300  ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`
                }
              >
                {columns?.map((row, k) =>
                  row.field === "status" && !row?.multipleValues ? (
                    <td key={k} className="p-4  text-sm text-textColor ">
                      {item[row.field] !== undefined &&
                      item[row.field] !== null ? (
                        <StatusBadge data={item[row.field]} />
                      ) : (
                        ""
                      )}
                    </td>
                  ) : row?.multipleValues ? (
                    <MultipleValueComp key={k} item={item} field={row.field} />
                  ) : row.field === "action" ? (
                    <td
                      key={k}
                      className="p-4  text-sm text-textColor relative"
                    >
                      {row?.type === "ticketsAction" ? (
                        <ActionsComp2
                          data={item}
                          renderFunction={renderFunction}
                        />
                      ) : (
                        <ActionsComp data={item} />
                      )}
                    </td>
                  ) : row.field === "is_seen" ? (
                    <td
                      key={k}
                      className={`p-4 cursor-pointer text-sm
                      ${
                        item[row.field] === 0
                          ? "text-redColor"
                          : "text-blueColor"
                      }
                       relative`}
                    >
                      {item[row.field] === 0 ? "Not Seen" : "Seen"}
                    </td>
                  ) : row.field === "checkout_url" ? (
                    <td
                      key={k}
                      className={`p-4 cursor-pointer text-sm relative`}
                    >
                      <a
                        href={item[row.field]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <StatusBadge data={"status"} />
                      </a>
                    </td>
                  ) : (
                    <UniqueColumnData key={k} item={item} row={row} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;

// green :- investment, deposit, total deposit wallet, total
// red:- Roi withdrawal, insterest withdrawal, RNB withdrawal
// blue:- cash_investment token investment
