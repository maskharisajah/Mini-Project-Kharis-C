import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import TablePagination from "./pagination";

export default function Table(props) {
  const { columns = [], datas = [] } = props;

  const table = useReactTable({
    data: datas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full flex flex-col items-end border-2 border-sky-500 rounded-lg my-10">
      <div className="overflow-x-auto w-full">
        <table className="table ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="font-bold" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th className="text-white border-b-2 border-sky-500" key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr className="border border-sky-500" key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
