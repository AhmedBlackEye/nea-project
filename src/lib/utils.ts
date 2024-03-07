import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(fullName: string, joinWith = "") {
  return fullName
    .split(" ")
    .map((n: string) => n[0])
    .join(joinWith);
}
