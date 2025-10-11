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
	id: Str(),
	title: Str(),
	category_id: Str(),
	sub_category_id: Str({ required: false }),
	donor_name: Str({ required: false }),
	donated_date: z.string(),
	location_id: Str(),
	status: z.enum(["available", "lending", "maintenance", "lost"]),
	description: Str({ required: false }),
	isbn: Str({ required: false }),
	author: Str({ required: false }),
	publisher: Str({ required: false }),
	published_year: z.number().int().optional(),
	manufacturer: Str({ required: false }),
	model_number: Str({ required: false }),
	condition: z.enum(["new", "good", "fair", "poor"]).optional(),
	created_by: Str(),
	created_at: z.string(),
	updated_at: z.string(),
});

export const Category = z.object({
	id: Str(),
	name: Str(),
	description: Str({ required: false }),
});

export const SubCategory = z.object({
	id: Str(),
	name: Str(),
	description: Str({ required: false }),
});

export const Location = z.object({
	id: Str(),
	name: Str(),
	building: Str({ required: false }),
	floor: Str({ required: false }),
	room: Str({ required: false }),
	shelf: Str({ required: false }),
});
