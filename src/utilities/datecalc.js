// Import the required functions from date-fns
import { set, sub } from "date-fns";

function dateCalculator(weddingDateInput, durationInput) {
  const weddingDate = set(
    new Date(weddingDateInput),
    { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
    { timeZone: "UTC" }
  );

  // Duration (weeks or days) for the task
  const duration = durationInput; // Eg., '2 weeks' or '5 days'

  // Extract the duration value and unit
  const durationValue = parseInt(duration);
  const durationUnit = duration.includes("week") ? "weeks" : "days";

  // Calculate the toBeDoneBy date (wedding date minus the duration)
  const toBeDoneBy = sub(weddingDate, { [durationUnit]: durationValue });

  // Get current date
  const currentDate = new Date();

  // Calculate the difference between toBeDoneBy and current date in minutes
  const differenceInMinutes = Math.floor(
    (toBeDoneBy - currentDate) / (1000 * 60)
  );

  // Determine if the time to accomplish task is in the future or the past
  const isFuture = differenceInMinutes > 0;

  // Calculate the absolute difference in minutes
  const absoluteDifferenceInMinutes = Math.abs(differenceInMinutes);

  // Calculate the time to accomplish task in weeks, days, hours, and minutes
  const weeks = Math.floor(absoluteDifferenceInMinutes / (7 * 24 * 60));
  const remainingMinutes = absoluteDifferenceInMinutes % (7 * 24 * 60);
  const days = Math.floor(remainingMinutes / (24 * 60));
  const remainingMinutes2 = remainingMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutes2 / 60);
  const minutes = remainingMinutes2 % 60;

  // Build the formatted time to accomplish task string
  let timeToAccomplish = "";
  if (weeks > 1) {
    timeToAccomplish += `${weeks} weeks`;
  } else if (weeks === 1) {
    timeToAccomplish += `${weeks} week`;
  } else if (weeks < 1 && days > 1) {
    timeToAccomplish += `${days} days `;
    // if (days > 1) {
  } else if (days === 1) {
    timeToAccomplish += `${days} day `;
  } else if (days < 1 && hours > 1) {
    timeToAccomplish += `${hours} hours `;
  }
  // if (hours > 1) {}
  else if (hours === 1) {
    timeToAccomplish += `${hours} hour, `;
  } else if (minutes > 1 && hours < 1) {
    timeToAccomplish += `${minutes} minutes`;
  } else if (minutes === 1) {
    timeToAccomplish += `${minutes} minute`;
  }

  // Add "ago" or "left" depending on the duration direction
  if (isFuture) {
    timeToAccomplish += " left";
  } else {
    timeToAccomplish += " ago";
  }

  return { timeToAccomplish };
}

export { dateCalculator };
