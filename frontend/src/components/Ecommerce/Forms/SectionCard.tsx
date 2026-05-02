const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-5">
      <h3 className="font-bold text-lg">{title}</h3>
      {children}
    </div>
  );
};

export default SectionCard;