import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { type AppContext, Donation } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationFetch extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "Get a single donation",
		request: {
			params: z.object({
				donationId: Str({ description: "Donation ID" }),
			}),
		},
		responses: {
			"200": {
				description: "Returns the donation",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: Donation.extend({
								categories: z.object({ name: z.string() }),
								locations: z.object({ name: z.string() }),
							}),
						}),
					},
				},
			},
			"404": {
				description: "Donation not found",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							error: z.string(),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const { donationId } = data.params;

		const supabase = createSupabaseClient(c.env);

		const { data: donation, error } = await supabase
			.from('donations')
			.select(`
				*,
				categories!inner(name),
				locations!inner(name)
			`)
			.eq('id', donationId)
			.is('deleted_at', null)
			.single();

		if (error || !donation) {
			return c.json(
				{
					success: false,
					error: "Donation not found",
				},
				{ status: 404 }
			);
		}

		return c.json({
			success: true,
			data: donation,
		});
	}
}