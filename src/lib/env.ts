import { z } from "zod";

/**
 * Client-safe environment variables.
 * Only NEXT_PUBLIC_* values are available in the browser.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url()
    .default("http://localhost:5000/api"),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
