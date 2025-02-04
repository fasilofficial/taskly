import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Auth Layout</h1>
        <Outlet />
      </div>
    </div>
  );
}
