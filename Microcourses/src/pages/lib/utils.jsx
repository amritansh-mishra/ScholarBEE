import clsx from "clsx";          // default export
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names with Tailwind’s conflict‑resolution.
 *
 * @param  {...any} inputs – strings, arrays, objects, or a mix (same
 *                           shapes that `clsx` accepts)
 * @returns {string}        – a single, space‑separated class string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}