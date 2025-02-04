import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Tasks" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export async function action({ params }: Route.ActionArgs) {}

export default function View({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Tasks</h1>
    </>
  );
}
