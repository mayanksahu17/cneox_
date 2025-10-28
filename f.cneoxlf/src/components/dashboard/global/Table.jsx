import React from "react";
import clsx from "clsx";
import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";

export default function Table({ className, columns, data, heading }) {
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

  return (
    <div className="w-full overflow-auto">
      {heading && (
        <div className="mb-2 text-xl font-normal text-gray-800 dark:text-gray-200">
          {heading}
        </div>
      )}
      <table
        className={clsx(
          "table-auto w-full border border-solid border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",
          className
        )}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((el) => (
            <tr
              {...el.getHeaderGroupProps()}
              className="bg-blue-600 dark:bg-blue-800 text-white"
              key={el.id}
            >
              {el.headers.map((currElem) => (
                <th
                  {...currElem.getHeaderProps()}
                  className="py-2 px-4 font-normal uppercase sm:py-3 sm:px-6 md:py-4 md:px-8 text-center"
                  key={currElem.id}
                >
                  {currElem.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="w-full">
          {!(data?.length < 1) ? (
            page.map((el) => {
              prepareRow(el);
              return (
                <tr
                  {...el.getRowProps()}
                  className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  key={el.id}
                >
                  {el.cells.map((currElem) => (
                    <td
                      {...currElem.getCellProps()}
                      className="py-2 px-4 font-normal sm:py-3 sm:px-6 md:py-4 md:px-8 text-center text-gray-800 dark:text-gray-200"
                      key={currElem.id}
                    >
                      {currElem.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td
                colSpan={columns.length}
                className="py-8 px-4 font-normal sm:px-6 md:px-8 text-center text-gray-500 dark:text-gray-400"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 mt-4 py-3 sm:py-2 rounded-b-lg">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
          Showing{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {pageIndex * 10 + 1}-{Math.min((pageIndex + 1) * 10, data.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {data.length}
          </span>{" "}
          results
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
          containerClassName={"flex items-center gap-1 text-sm"}
          pageClassName={"flex"}
          pageLinkClassName={
            "px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }
          activeClassName={"bg-blue-100 dark:bg-blue-900/50"}
          activeLinkClassName={
            "text-blue-600 dark:text-blue-400 font-medium"
          }
          breakClassName={"text-gray-500 dark:text-gray-400 px-2"}
          previousClassName={"mr-2"}
          nextClassName={"ml-2"}
          previousLinkClassName={
            "px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          }
          nextLinkClassName={
            "px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
          disabledLinkClassName={"hover:bg-transparent"}
        />
      </div>
    </div>
  );
}