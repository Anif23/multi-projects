type Props = {
  title: string;
  subtitle?: string;
  badge?: string;

  buttonText?: string;
  onClick?: () => void;

  secondaryAction?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
};

const PageHeader = ({
  title,
  subtitle,
  badge = "Admin Panel",
  buttonText,
  onClick,
  secondaryAction,
}: Props) => {
  return (
    <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 text-white p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        
        <div>
          <p className="uppercase text-xs tracking-[0.3em] text-gray-400">
            {badge}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-300 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">

          {secondaryAction}

          {buttonText && onClick && (
            <button
              onClick={onClick}
              className="px-6 h-12 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              {buttonText}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default PageHeader;