import { useState } from "react";
import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const TaskTable = ({
  tasks,
  onView,
  onEdit,
  onDelete,
  userId,
}: {
  tasks: any[];
  onView: (task: any) => void;
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
  userId: string;
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.due_date).getTime();
    const dateB = new Date(b.due_date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="mt-8 flow-root">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                onClick={toggleSortOrder}
              >
                Due Date {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedTasks.map((task) => (
              <tr key={task.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {task.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  <StatusBadge status={task.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {new Date(task.due_date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {task.user.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {new Date(task.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <ActionButtons
                    task={task}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    userId={userId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
