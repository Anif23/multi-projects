const StatsCard = ({
  title,
  value,
  icon,
}: any) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-4">
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;