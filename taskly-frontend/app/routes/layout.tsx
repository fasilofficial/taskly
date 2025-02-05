import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Header from "~/components/Header";
import type { RootState } from "~/store";

export default function Layout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-8 shadow-sm">
        <Header />
      </div>
      <div className="mt-4 p-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
