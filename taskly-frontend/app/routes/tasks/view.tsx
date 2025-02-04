import type { Route } from "./+types/view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Task View" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const taskId = params.taskId;
  return { taskId };
}

export async function action({ params }: Route.ActionArgs) {}

export default function View({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Task View {loaderData.taskId}</h1>
    </>
  );
}
