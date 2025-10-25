import React from "react";
import clsx from "clsx";
import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";

export default function SecondaryTable({ className, columns, data, heading }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    previousPage,
    nextPage,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  // Helper function for conditional formatting
  const getColorClass = (value) => {
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="w-full overflow-auto bg-gray-800 rounded-2xl">
      {heading && (
        <div className="mb-2 text-xl font-normal text-white">{heading}</div>
      )}
      <table
        className={clsx(
          "table-auto w-full border border-solid border-slate-700",
          className
        )}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-white"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-3 px-4 text-center uppercase font-semibold border-b border-slate-700"
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-white">
          {!(data?.length < 1) ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b border-slate-700"
                  key={row.id}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={clsx(
                        "px-2  py-1 text-center",
                        getColorClass(cell.value)
                      )}
                      key={cell.id}
                    >
                      {cell.column.id === "priceGraph" ? (
                        <img
                          src="path-to-your-graph-icon"
                          alt="price trend"
                          className="w-8 h-8 inline-block"
                        />
                      ) : cell.column.id === "arrowIcon" ? (
                        <span className="inline-block">
                          ➡️ {/* Replace with actual icon */}
                        </span>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr className="border-b border-slate-700">
              <td className="py-3 px-4 text-center" colSpan={columns.length}>
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-900 bg-gray-700 px-4 mt-4 py-2 text-white">
        <div className="text-sm">
          Showing{" "}
          <span className="font-medium">
            {pageIndex * 10 + 1}-{Math.min((pageIndex + 1) * 10, data.length)}
          </span>{" "}
          of <span className="font-medium">{data.length}</span> results
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => {
            gotoPage(data.selected);
          }}
          containerClassName={"flex space-x-2 !text-sm text-white items-center"}
          activeClassName={"bg-green-600 text-white rounded-md px-3 py-1.5"}
          pageClassName={"text-white py-1.5"}
          pageLinkClassName={"px-3 py-1.5 hover:bg-gray-700 rounded"}
          previousClassName={"px-3 py-1.5 text-white hover:bg-gray-700"}
          nextClassName={"px-3 py-1.5 text-white hover:bg-gray-700"}
        />
      </div>
    </div>
  );
}
