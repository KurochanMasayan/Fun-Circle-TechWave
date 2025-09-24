import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Location } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class LocationList extends OpenAPIRoute {
	schema = {
		tags: ["Locations"],
		summary: "List storage locations",
		responses: {
			"200": {
				description: "Returns a list of storage locations",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: z.array(z.object({
								id: z.string(),
								name: z.string(),
								building: z.string().optional(),
								floor: z.string().optional(),
								room: z.string().optional(),
								shelf: z.string().optional(),
							})),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const supabase = createSupabaseClient(c.env);

		const { data: locations, error } = await supabase
			.from('locations')
			.select(`
				id,
				name,
				building,
				floor,
				room,
				shelf
			`)
			.order('name', { ascending: true });

		if (error) {
			return c.json({
				success: false,
				error: error.message,
			}, { status: 500 });
		}

		return c.json({
			success: true,
			data: locations || [],
		});
	}
}