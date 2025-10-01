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

export const Donation = z.object({
	id: Str({ required: false }),
	title: Str({ example: "プログラミング入門書" }),
	category_id: Str(),
	sub_category_id: Str({ required: false }),
	donor_name: Str({ required: false }),
	donated_date: Str(),
	location_id: Str(),
	status: Str({ example: "available" }).default("available"),
	description: Str({ required: false }),
	isbn: Str({ required: false }),
	author: Str({ required: false }),
	publisher: Str({ required: false }),
	published_year: z.number().optional(),
	manufacturer: Str({ required: false }),
	model_number: Str({ required: false }),
	condition: Str({ required: false }),
	created_by: Str(),
	updated_by: Str({ required: false }),
});
