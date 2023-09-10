import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Icon from "../../user/components/Icon";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";

const TableTemp = (props) => {
  const columns = useMemo(() => props.Cols, []);

  const data = useMemo(() => props.Data, []);

  const tableInst = useTable(
    {
      columns,
      data,
      getData: props.getData,
    },
    useSortBy,
    usePagination
  );

  const tableStyle = "w-full table-auto h-fit table-auto";
  const tHead =
    "bg-slate-100 text-gray-600 h-11 text-base sticky top-0 text-left";
  const trStyle = "h-20 text-gray-500";
  const thStyle = "pl-6 select-none w-fit";
  const tdStyle = "pl-6 border-y border-slate-200";

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    tableInst;

  return (
    <div className="flex flex-col justify-end w-full rounded-md pt-4">
      <div>
        <div className="max-h-[686px] min-w-[400px] h-fit border-t border-slate-300 overflow-auto">
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
                      <span className="flex">
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
              {page.map((row) => {
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
      </div>
      <div className="ml-5 space-x-5 h-20 flex items-center">
        <span>
          Page{" "}
          <strong>
            {props.page} of {props.pagination.pageCount}
          </strong>
          <span> ({props.pagination.total})</span>
        </span>
        <div className="inline-flex -space-x-px z-0">
          <button
            onClick={props.prev}
            className={`border-gray-300 inline-flex rounded-l-md border px-3.5 py-1.5 ${
              props.page <= 1
                ? "cursor-default bg-gray-200"
                : "hover:bg-gray-100 cursor-pointer "
            }`}
          >
            <Icon size="20" color="#475569" iconn={<BiLeftArrowAlt />} />
          </button>
          <button
            onClick={props.next}
            className={`border-gray-300 inline-flex rounded-r-md border px-3.5 py-1.5 ${
              props.page >= props.pagination.pageCount
                ? "cursor-default bg-gray-200"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            <Icon size="20" color="#475569" iconn={<BiRightArrowAlt />} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableTemp;
