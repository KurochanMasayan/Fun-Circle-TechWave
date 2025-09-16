import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export interface Env {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
}

export type AppContext = Context<{ Bindings: Env }>;

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});

export * from './types';
