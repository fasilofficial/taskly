import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

const ActionButtons = ({ task, onView, onEdit, onDelete, userId }) => (
  <div className="flex justify-end gap-2">
    <button
      onClick={() => onView(task)}
      className="cursor-pointer text-blue-600 hover:text-blue-800"
      title="View"
    >
      <Eye className="size-4" />
    </button>
    {userId === task.user_id && (
      <>
        <button
          onClick={() => onEdit(task)}
          className="cursor-pointer text-green-600 hover:text-green-800"
          title="Edit"
        >
          <Pencil className="size-4" />
        </button>
        <button
          onClick={() => onDelete(task)}
          className="cursor-pointer text-red-600 hover:text-red-800"
          title="Delete"
        >
          <Trash2 className="size-4" />
        </button>
      </>
    )}
  </div>
);

export default ActionButtons;
