import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Outlet />
    </div>
  );
}
