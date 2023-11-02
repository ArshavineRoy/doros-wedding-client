function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedWithSuffix = formattedDate.replace(
    `${day}, ${date.getFullYear()}`,
    `${day}${suffix}, ${date.getFullYear()}`
  );

  return formattedWithSuffix;
}

export { formatDate };
