import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Category, SubCategory } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class CategoryList extends OpenAPIRoute {
	schema = {
		tags: ["Categories"],
		summary: "List categories with sub-categories",
		responses: {
			"200": {
				description: "Returns a list of categories with their sub-categories",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: z.array(z.object({
								id: z.string(),
								name: z.string(),
								description: z.string().optional(),
								display_order: z.number(),
								sub_categories: z.array(z.object({
									id: z.string(),
									name: z.string(),
									description: z.string().optional(),
									display_order: z.number(),
								})),
							})),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const supabase = createSupabaseClient(c.env);

		const { data: categories, error } = await supabase
			.from('categories')
			.select(`
				id,
				name,
				description,
				display_order,
				sub_categories (
					id,
					name,
					description,
					display_order
				)
			`)
			.order('display_order', { ascending: true });

		if (error) {
			return c.json({
				success: false,
				error: error.message,
			}, { status: 500 });
		}

		return c.json({
			success: true,
			data: categories || [],
		});
	}
}