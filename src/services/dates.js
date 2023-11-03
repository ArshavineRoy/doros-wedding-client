import { getTokensInCookies } from "../ui/features/auth/authCookies";

const { accessToken, refreshToken } = getTokensInCookies();

export async function getDates() {
  const bearertoken = accessToken; // Replace this with your actual bearer token

  const response = await fetch(
    "https://doros-wedding-server.onrender.com/events/1",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearertoken}`, // Fixed the Authorization header format
      },
    }
  );
  if (!response.ok) throw new Error("Could not fetch tasks");

  const data = await response.json();

  return data;
}
