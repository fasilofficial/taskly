import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import type { Route } from "./+types/edit";

interface FormData {
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const taskId = params.taskId;
  return { taskId };
}

export default function Edit({ loaderData }: Route.ComponentProps) {
  const taskId = loaderData.taskId;
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title,
            description: data.description,
            status: data.status,
            due_date: data.due_date,
          });
        } else {
          console.error("Failed to fetch task details");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [taskId, token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.due_date.trim()) newErrors.due_date = "Due date is required";
    if (!["pending", "completed"].includes(formData.status))
      newErrors.status = "Invalid status";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          navigate("/");
        } else {
          const data = await response.json();
          setErrors({ submit: data.message || "Update failed" });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        setErrors({
          submit: "An error occurred while updating. Please try again.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Edit Task
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.submit && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-md">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="due_date"
              className="block text-sm font-medium text-gray-900"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm">{errors.due_date}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center rounded-md bg-gray-600 px-3 py-1.5 text-white font-semibold hover:bg-gray-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
