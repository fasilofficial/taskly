import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskly | Profile" },
    { name: "description", content: "Welcome to the Taskly app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export async function action({ params }: Route.ActionArgs) {}

export default function Profile({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
