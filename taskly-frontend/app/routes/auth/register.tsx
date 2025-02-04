import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Register" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export async function action({ params }: Route.ActionArgs) {}

export default function Register({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Register</h1>
    </>
  );
}
