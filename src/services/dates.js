async function getDates() {
  const res = await fetch("https://doros-wedding-server.onrender.com/events/1");
  if (!res.ok) throw new Error("Could not fetch menu");

  const data = await res.json();
  return data;
}
