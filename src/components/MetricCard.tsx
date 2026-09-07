type MetricCardProps = {
  label: string;
  title?: string;
  value: string | number;
  className?: string;
};

function MetricCard({ label, value, className, title }: MetricCardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 p-5 shadow-sm text-sm font-medium text-slate-60 ${
        className ?? "bg-white"
      }`}
    >
      <p className="font-bold text-slate-600 uppercase">{label}</p>
      {title && <p>{title}</p>}
      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default MetricCard;
