const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
