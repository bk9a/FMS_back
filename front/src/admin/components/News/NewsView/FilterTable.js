import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { NewsLists } from "../../../../assets/store/NewsLists";
import { NewsCols } from "./NewsCols";
import Icon from "../../../../user/components/Icon";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const FilterTable = () => {
  const columns = useMemo(() => NewsCols, []);

  const data = useMemo(() => NewsLists, []);
  const tableStyle =
    "w-full table-auto text-center border-collapse border border-slate-500";
  const tHead = "bg-slate-500 text-white h-11 text-base";
  const trStyle = "odd:bg-white even:bg-slate-300 h-10";
  const thStyle = "border border-slate-400 select-none w-fit";
  const tdStyle = "border border-slate-500";

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getSortByToggleProps,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { GlobalFilter } = state;

  return (
    <>
      <GlobalFilter filter={GlobalFilter} setFilter={setGlobalFilter} />
      <div className="min-h-full bg-slate-50 w-full rounded-md py-8 px-10 space-y-8">
        <table className={tableStyle} {...getTableProps()}>
          <thead className={tHead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={`${thStyle}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span className="flex items-end justify-end">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon size="12" iconn={<GoTriangleDown />} />
                        ) : (
                          <Icon size="12" iconn={<GoTriangleUp />} />
                        )
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className={trStyle} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className={tdStyle} {...cell.getCellProps()}>
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
    </>
  );
};

export default FilterTable;
