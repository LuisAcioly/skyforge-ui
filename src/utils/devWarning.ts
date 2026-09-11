declare const process: { env: { NODE_ENV?: string } };

/**
 * Reports a misuse of a component API during development.
 *
 * Library mode keeps `process.env.NODE_ENV` in the bundle so the consumer's
 * bundler replaces it: production builds drop the message, development builds
 * print it. Without a bundler `process` is undefined and nothing is reported.
 */
export function devError(message: string) {
  try {
    if (process.env.NODE_ENV === "production") {
      return;
    }
  } catch {
    return;
  }

  console.error(`[skyforge-ui] ${message}`);
}
