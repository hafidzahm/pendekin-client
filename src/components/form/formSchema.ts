"use client";

import { z } from "zod";

export const formSchema = z.object({
  shorted_site: z
    .string()
    .min(1, { message: "This field is required" })
    .min(4, { message: "Minimum alias for shorted site is 4 character." }),
  original_site: z
    .string()
    .min(1, { message: "This field is required" })
    .url("This field must be an URL"),
});
