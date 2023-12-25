import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToPersianNumber = (number: string) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const parseDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  });
  const [dateString, timeString] = formatter.format(date).split(",");

  return { dateString, timeString };
};

export const getPersianDate = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  }).format(date);
  return formatter;
};
