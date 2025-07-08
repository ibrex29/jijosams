// utils/dateUtils.ts
import dayjs from "dayjs";

export function formatDate(dateString: string): string {
  return dayjs(dateString).format("MMMM DD, YYYY"); // October 26, 2024
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
