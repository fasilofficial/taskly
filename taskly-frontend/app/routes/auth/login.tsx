import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Login" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export async function action({ params }: Route.ActionArgs) {}

export default function Login({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Login</h1>
    </>
  );
}
