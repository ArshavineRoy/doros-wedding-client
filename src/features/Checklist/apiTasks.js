export async function addHotel(data, bearertoken) {
  const res = await fetch("http://localhost:3000/hotels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearertoken}`, // Fixed the Authorization header format
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Could not create new task");
}
