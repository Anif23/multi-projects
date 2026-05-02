type Props = {
  label?: string;
  value: any;
  onChange: (e: any) => void;
  type?: string;
  placeholder?: string;
};

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: Props) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-gray-500">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 border rounded-2xl px-4 w-full focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
};

export default InputField;