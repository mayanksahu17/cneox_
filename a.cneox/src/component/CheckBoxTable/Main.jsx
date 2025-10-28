import React, { useEffect, useState } from "react";
import { PaginationComponent, ShowEntries, StatusBadge } from "..";
import UniqueColumnData from "../ReportsTable/UniqueColumnData";
import MultipleValueComp from "../ReportsTable/MultipleValueComp";

const Main = ({ columns, data, filteringParameter, setSelectedDataIds }) => {
  //table entries
  const [tableEntries, setTableEntries] = useState(25);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = tableEntries;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npages = Math.ceil(data.length / recordsPerPage);

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

  // console.log(npages);

  // row selection
  const [selectedData, setSelectedData] = useState([]);

  // console.log(selectedData.map((ele) => ele[filteringParameter]));

  useEffect(() => {
    setSelectedDataIds(
      selectedData.map((ele, key) => {
        // console.log(ele);
        return ele[filteringParameter];
      })
    );
  }, [selectedData, setSelectedDataIds, filteringParameter]);

  return (
    <>
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
      <div className="overflow-auto rounded-lg shadow-lg ">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200 w-full ">
            <tr className="w-full divide-x divide-gray-300">
              <th
                className={`cursor-pointer w-8 p-3 text-xs text-textColor font-semibold tracking-wide text-left bg-gray-200`}
              >
                <input
                  id="default-checkbox"
                  checked={
                    records.length !== 0 &&
                    selectedData.length === records.length
                  }
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedData(records);
                    } else {
                      setSelectedData([]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                />
              </th>
              {columns.map((ele, i) => (
                <th
                  key={i}
                  className={`cursor-pointer w-fit p-3 text-xs text-textColor font-semibold tracking-wide text-left bg-gray-200`}
                >
                  {ele.fieldName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {records.map((item, i) => (
              <tr
                key={i}
                className={`divide-x divide-gray-300 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-4 w-8  text-sm text-textColor ">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    checked={selectedData.includes(item)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedData([...selectedData, item]);
                      } else {
                        setSelectedData(
                          selectedData.filter(
                            (ele) =>
                              ele[filteringParameter] !==
                              item[filteringParameter]
                          )
                        );
                      }
                    }}
                  />
                </td>
                {columns.map((row, k) =>
                  row.field === "status" ? (
                    <td key={k} className="p-4  text-sm text-textColor ">
                      <StatusBadge data={item[row.field]} />
                    </td>
                  ) : row?.multipleValues ? (
                    <MultipleValueComp key={k} item={item} field={row.field} />
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
