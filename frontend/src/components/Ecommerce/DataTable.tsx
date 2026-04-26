const DataTable = ({ columns, data }: any) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-sm">

        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col: any) => (
              <th key={col.header} className="p-3 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {columns.map((col: any) => (
                <td key={col.header} className="p-3">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DataTable;