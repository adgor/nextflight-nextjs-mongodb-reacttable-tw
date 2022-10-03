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
          <div className="overflow-hidden border-gray-400 shadow border-y sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-600"
            >
              <thead className=" bg-gray-600/30">
                {headerGroups.map((headerGroup) => (
                  <tr
                    className="sticky top-0"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 text-sm tracking-wider text-left text-gray-100 uppercase "
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <i class=" ml-2  fa fa-sort-desc"></i>
                            ) : (
                              <i class="ml-2 fa fa-sort-asc"></i>
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-600 "
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      className=" hover:bg-gray-600/20"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4 text-sm text-white"
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
          <div className="flex items-center justify-between py-3 bg-bgk ">
            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <nav
                  className="relative z-0 inline-flex -space-x-px rounded-md "
                  aria-label="Pagination"
                >
                  <select
                    className="relative inline-flex items-center px-2 py-2 mr-4 text-sm font-medium text-gray-300 border border-gray-500 rounded-md cursor-pointer hover:text-white bg-bgk focus:bg-bgk focus:border-white disabled:opacity-50 hover:border-gray-400"
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
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-500 cursor-pointer hover:border-gray-400 hover:text-gray-400 bg-bgk disabled:opacity-50 rounded-l-md "
                  >
                    <ChevronDoubleLeftIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-500 cursor-pointer hover:border-gray-400 hover:text-gray-400 bg-bgk disabled:opacity-50 "
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </a>

                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 border border-gray-400 "
                  >
                    {pageIndex + 1}
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 border border-gray-500 hover:border-gray-400"
                  >
                    of {pageOptions.length}
                  </a>

                  <a
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-500 cursor-pointer disabled:opacity-50 hover:border-gray-400"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-500 cursor-pointer hover:text-gray-400 disabled:opacity-10 rounded-r-md hover:border-gray-400"
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
