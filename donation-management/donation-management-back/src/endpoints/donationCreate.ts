import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Donation } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationCreate extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "Create a new donation",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Donation.omit({ id: true }),
					},
				},
			},
		},
		responses: {
			"201": {
				description: "Donation created successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: Donation,
						}),
					},
				},
			},
			"400": {
				description: "Bad request",
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
		const donationData = data.body;

		const supabase = createSupabaseClient(c.env);

		// カテゴリとロケーションの存在確認
		const [categoryCheck, locationCheck] = await Promise.all([
			supabase.from('categories').select('id').eq('id', donationData.category_id).single(),
			supabase.from('locations').select('id').eq('id', donationData.location_id).single(),
		]);

		if (categoryCheck.error) {
			return c.json(
				{
					success: false,
					error: "Invalid category_id",
				},
				{ status: 400 }
			);
		}

		if (locationCheck.error) {
			return c.json(
				{
					success: false,
					error: "Invalid location_id",
				},
				{ status: 400 }
			);
		}

		const { data: donation, error } = await supabase
			.from('donations')
			.insert([donationData])
			.select()
			.single();

		if (error) {
			return c.json(
				{
					success: false,
					error: error.message,
				},
				{ status: 500 }
			);
		}

		return c.json(
			{
				success: true,
				data: donation,
			},
			{ status: 201 }
		);
	}
}