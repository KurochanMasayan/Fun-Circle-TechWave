import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Donation } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationList extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "List Donations (Basic - without search/filter)",
		request: {
			query: z.object({
				page: Num({
					description: "Page number",
					default: 0,
				}),
				limit: Num({
					description: "Number of items per page",
					default: 20,
				}),
			}),
		},
		responses: {
			"200": {
				description: "Returns a basic list of donations",
				content: {
					"application/json": {
						schema: z.object({
							success: Bool(),
							data: z.object({
								donations: Donation.array(),
								total: Num(),
								page: Num(),
								limit: Num(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const { page, limit } = data.query;

		const supabase = createSupabaseClient(c.env);

		const { data: donations, error, count } = await supabase
			.from('donations')
			.select(`
				*,
				categories!inner(name),
				locations!inner(name)
			`, { count: 'exact' })
			.is('deleted_at', null)
			.order('created_at', { ascending: false })
			.range(page * limit, (page + 1) * limit - 1);

		if (error) {
			return c.json(
				{
					success: false,
					error: error.message,
				},
				{ status: 500 }
			);
		}

		return c.json({
			success: true,
			data: {
				donations: donations || [],
				total: count || 0,
				page,
				limit,
			},
		});
	}
}