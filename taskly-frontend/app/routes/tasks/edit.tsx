import type { Route } from "./+types/edit";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Task Edit" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export async function action({ params }: Route.ActionArgs) {}

export default function Edit({ params }: Route.LoaderArgs) {
  return (
    <>
      <h1>Task Edit {params.taskId}</h1>
    </>
  );
}
