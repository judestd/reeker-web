import vi from "./vi";
import en from "./en";

export const resources = {
  vi,
  en,
} as const;

export type Languages = keyof typeof resources;
