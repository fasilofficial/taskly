import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/tasks/index.tsx"),
    ...prefix("tasks", [
      route("/:taskId", "routes/tasks/view.tsx"),
      route("/:taskId/edit", "routes/tasks/edit.tsx"),
      route("/add", "routes/tasks/add.tsx"),
    ]),
    route("/profile", "routes/user/profile.tsx"),
  ]),

  layout("routes/auth/layout.tsx", [
    route("/login", "routes/auth/login.tsx"),
    route("/register", "routes/auth/register.tsx"),
  ]),


] satisfies RouteConfig;
