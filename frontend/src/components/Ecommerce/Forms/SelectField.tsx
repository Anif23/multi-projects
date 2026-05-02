type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label?: string;
  value: any;
  onChange: (e: any) => void;
  options: Option[];
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: Props) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-gray-500">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="h-12 border rounded-2xl px-4 w-full"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;