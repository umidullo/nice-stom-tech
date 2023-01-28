import { Column, useTable } from 'react-table';

type TableProps<T extends Record<string, unknown>> = {
  columns: readonly Column<T>[];
  data: T[];
};

const Table = <T extends Record<string, unknown>>({
  data,
  columns,
}: TableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });
  return (
    <table
      {...getTableProps()}
      className="overflow-x-scroll items-center mb-0 align-top border-gray-200 text-slate-800 w-full"
    >
      <thead className="align-bottom">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  style: {
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  },
                })}
                className="px-6 py-3 font-semibold shadow-none text-xl whitespace-nowrap text-black bg-blue-200"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                style: {},
              })}
              className="odd:bg-blue-50 overflow-x-scroll hover:bg-blue-100"
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps({
                      style: {},
                    })}
                    className="p-2 align-middle bg-transparent "
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
