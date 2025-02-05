import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import StatusBadge from "~/components/StatusBadge";
import type { Route } from "./+types/view";

interface Task {
  taskId: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const taskId = params.taskId;
  return { taskId };
}

export default function View({ params }: Route.LoaderArgs) {
  const taskId = params.taskId;
  const token = useSelector((state: RootState) => state.auth.token);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError("Error loading task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, token]);

  if (loading) {
    return <p className="text-center mt-10">Loading task...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Task Details
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6 bg-white p-6 rounded-md shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Title</p>
            <p className="text-lg font-semibold text-gray-900">{task?.title}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-gray-700">{task?.description}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Due Date</p>
            <p className="text-gray-700">{task?.due_date}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <StatusBadge status={task?.status} />
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center rounded-md bg-gray-600 px-3 py-1.5 text-white font-semibold hover:bg-gray-500"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
