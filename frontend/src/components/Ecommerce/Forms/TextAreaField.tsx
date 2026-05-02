type Props = {
  label?: string;
  value: any;
  onChange: (e: any) => void;
  placeholder?: string;
  rows?: number;
};

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: Props) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-gray-500">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
};

export default TextAreaField;