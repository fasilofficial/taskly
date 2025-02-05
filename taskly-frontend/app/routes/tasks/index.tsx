import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import type { RootState } from "~/store";
import TaskTable from "~/components/TaskTable";
import DeleteConfirmationDialog from "~/components/DeleteConfirmationDialog";
import type { Task } from "types";

export default function View() {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    task: null,
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    }
  }, [statusFilter, tasks]);

  const handleView = (task: Task) => navigate(`/tasks/${task.id}`);
  const handleEdit = (task: Task) => navigate(`/tasks/${task.id}/edit`);

  const handleDelete = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((t) => t.id !== task.id));
      setDeleteDialog({ isOpen: false, task: null });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
          {user && (
            <p className="mt-2 text-sm text-gray-700">
              Welcome back, {user.name}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Task Status Filter */}
          <select
            className="border-gray-300 rounded-md text-sm p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => navigate("/tasks/add")}
            className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
          >
            <Plus className="size-4" />
            Add Task
          </button>
        </div>
      </div>

      <TaskTable
        tasks={filteredTasks}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(task: Task) => setDeleteDialog({ isOpen: true, task })}
        userId={user?.id}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, task: null })}
        onConfirm={() => handleDelete(deleteDialog.task)}
        taskTitle={deleteDialog.task?.title}
      />
    </div>
  );
}
