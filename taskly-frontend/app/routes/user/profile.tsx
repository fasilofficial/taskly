import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { Route } from "./+types/profile";
import type { Task } from "types";
import StatusBadge from "~/components/StatusBadge";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Profile" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}
export async function action({ params }: Route.ActionArgs) {}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data.user);
        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
          {profile?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile?.name}</h2>
          <p className="text-gray-600">{profile?.email}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        Joined: {new Date(profile?.created_at).toLocaleDateString()}
      </p>
      <h3 className="text-xl font-semibold mt-6">Tasks</h3>
      <ul className="mt-2 space-y-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <li key={task.id} className="p-2 border rounded-md">
              <p className="font-medium">{task.title}</p>
              <p className="text-gray-600 text-sm">
                <StatusBadge status={task.status} />
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </ul>
      <div className="flex gap-4 mt-4">
        <Link
          to="/"
          className="w-full flex items-center justify-center rounded-md bg-gray-600 px-3 py-1.5 text-white font-semibold hover:bg-gray-500"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
