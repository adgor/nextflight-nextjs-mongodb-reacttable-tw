import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { COLUMNS } from "./columns";

import { GlobalFilter } from "./GlobalFilter";

export const SortingFilteringTable = ({ posts }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className="flex flex-col mt-16">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                {rows.map((row) => {
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
              <tfoot className="bg-gray-50">
                {footerGroups.map((footerGroup) => (
                  <tr {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.map((column) => (
                      <td
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        {...column.getFooterProps}
                      >
                        {column.render("Footer")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
