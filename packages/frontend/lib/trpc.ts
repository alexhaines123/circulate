import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@notes/functions/src/products/trpc";

export const trpc = createReactQueryHooks<AppRouter>();
