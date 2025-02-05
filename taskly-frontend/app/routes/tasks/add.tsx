import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store";

interface FormData {
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export default function Add() {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        const { ...creationData } = formData;

        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(creationData),
        });

        // Try to get the response content
        const contentType = response.headers.get("content-type");
        let errorMessage = "Creation failed";

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          if (response.ok) {
            navigate("/");
            return;
          }
          errorMessage = data.message || "Creation failed";
        } else {
          // If not JSON, get the text content for debugging
          const textContent = await response.text();

          errorMessage = "Server error occurred";
        }

        setErrors({ submit: errorMessage });
      } catch (error) {
        console.error("Full error:", error);
        setErrors({
          submit: "An error occurred during creation. Please try again.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Ensure date is formatted properly
    const updatedValue =
      name === "due_date" ? new Date(value).toISOString().split("T")[0] : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

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
          Create a new task
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
              <option value="" disabled>
                Select status
              </option>
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
