import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS } from "./columns";
import { GlobalFilter } from "./GlobalFilter";
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

export const FullFeatureTable = ({ posts }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="flex flex-col mt-6">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 align-middle ">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr
                    className="sticky top-0"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr className=" hover:bg-gray-50" {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4 text-sm text-gray-500"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between py-3 bg-white border-t border-gray-200 ">
            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <nav
                  className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <select
                    className="relative inline-flex items-center px-2 py-2 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer disabled:opacity-50 hover:bg-gray-50 "
                    name="pageSize"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[10, 25, 50, 100].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Shiko {pageSize}
                      </option>
                    ))}
                  </select>
                  <a
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 rounded-l-md hover:bg-gray-50"
                  >
                    <ChevronDoubleLeftIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </a>

                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50"
                  >
                    {pageIndex + 1}
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    of {pageOptions.length}
                  </a>

                  <a
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 rounded-r-md hover:bg-gray-50"
                  >
                    <ChevronDoubleRightIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
