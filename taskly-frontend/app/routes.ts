import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/tasks/index.tsx"),
    ...prefix("tasks", [
        route("/:taskId", "routes/tasks/view.tsx"),
        route("/:taskId/edit", "routes/tasks/edit.tsx"),
    ]),

    layout("routes/auth/layout.tsx", [
        route("/login", "routes/auth/login.tsx"),
        route("/register", "routes/auth/register.tsx"),
    ]),

    route("/profile", "routes/user/profile.tsx"),
] satisfies RouteConfig;
