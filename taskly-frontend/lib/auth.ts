export async function getAuthToken(request: Request) {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
}
