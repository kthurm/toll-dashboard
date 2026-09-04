type MetricCardProps = {
  label: string;
  value: string | number;
  className?: string;
};

function MetricCard({ label, value, className }: MetricCardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 p-5 shadow-sm ${
        className ?? "bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default MetricCard;
