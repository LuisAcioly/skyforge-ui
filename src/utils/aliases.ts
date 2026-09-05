/**
 * Additive naming aliases.
 *
 * The library grew two names for the same idea in several places. Rather than
 * rename anything (which would break every consuming project), both spellings
 * are accepted and normalized to one canonical value at the component boundary.
 * The canonical name is the one the majority of components already used.
 *
 *   destructive action : `danger` (Button, DropdownMenu) | `error` (six others)
 *   semantic prop name : `variant` (Badge, Tag, Chip, Alert) | `tone` (Progress, Spinner)
 *   borderless surface : `ghost` (eight components)        | `plain` (Table)
 *   non-compact density: `default` (TableDensity)          | `comfortable` (docs)
 */

/** Canonical for state-bearing components (Badge, Tag, Chip, Alert, Progress). */
export function normalizeToError<T extends string>(v: T | "danger" | "error"): T {
  return (v === "danger" ? "error" : v) as T;
}

/** Canonical for action-bearing components (Button, DropdownMenuItem). */
export function normalizeToDanger<T extends string>(v: T | "danger" | "error"): T {
  return (v === "error" ? "danger" : v) as T;
}

/** Table surface: `ghost` is accepted as a synonym of `plain`. */
export function normalizeSurface<T extends string>(v: T | "ghost" | "plain"): T {
  return (v === "ghost" ? "plain" : v) as T;
}

/** Table density: `comfortable` is accepted as a synonym of `default`. */
export function normalizeDensity<T extends string>(v: T | "comfortable" | "default"): T {
  return (v === "comfortable" ? "default" : v) as T;
}
