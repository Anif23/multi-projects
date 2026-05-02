type ActionConfig = {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  className?: string;
};

type Column = {
  header: string;
  accessor?: string;
  render?: (row: any) => React.ReactNode;
};

type Props = {
  columns: Column[];
  rows: any[];

  actions?: {
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    onView?: (row: any) => void;
  };
};

const DataTable = ({ columns, rows, actions }: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.header} className="p-4 text-left">
                  {col.header}
                </th>
              ))}

              {(actions?.onEdit || actions?.onDelete || actions?.onView) && (
                <th className="p-4 text-left">Actions</th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.header} className="p-4">
                    {col.render
                      ? col.render(row)
                      : col.accessor
                      ? row[col.accessor]
                      : null}
                  </td>
                ))}

                {/* ACTIONS */}
                {(actions?.onEdit ||
                  actions?.onDelete ||
                  actions?.onView) && (
                  <td className="p-4">
                    <div className="flex gap-3">

                      {actions?.onView && (
                        <button
                          onClick={() => actions.onView?.(row)}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      )}

                      {actions?.onEdit && (
                        <button
                          onClick={() => actions.onEdit?.(row)}
                          className="text-green-600 hover:underline"
                        >
                          Edit
                        </button>
                      )}

                      {actions?.onDelete && (
                        <button
                          onClick={() => actions.onDelete?.(row)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}

                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DataTable;