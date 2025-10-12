import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { type AppContext, Donation } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationUpdate extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "Update a donation",
		request: {
			params: z.object({
				donationId: Str({ description: "Donation ID" }),
			}),
			body: {
				content: {
					"application/json": {
						schema: Donation.omit({ id: true, created_by: true }).partial(),
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Donation updated successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: Donation,
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
		const updateData = data.body;

		const supabase = createSupabaseClient(c.env);

		// 寄贈物の存在確認
		const { data: existingDonation, error: fetchError } = await supabase
			.from('donations')
			.select('id')
			.eq('id', donationId)
			.is('deleted_at', null)
			.single();

		if (fetchError || !existingDonation) {
			return c.json(
				{
					success: false,
					error: "Donation not found",
				},
				{ status: 404 }
			);
		}

		// カテゴリとロケーションの存在確認（更新される場合のみ）
		const checks = [];
		if (updateData.category_id) {
			checks.push(
				supabase.from('categories').select('id').eq('id', updateData.category_id).single()
			);
		}
		if (updateData.location_id) {
			checks.push(
				supabase.from('locations').select('id').eq('id', updateData.location_id).single()
			);
		}

		const checkResults = await Promise.all(checks);
		for (const result of checkResults) {
			if (result.error) {
				return c.json(
					{
						success: false,
						error: "Invalid category_id or location_id",
					},
					{ status: 400 }
				);
			}
		}

		const { data: donation, error } = await supabase
			.from('donations')
			.update(updateData)
			.eq('id', donationId)
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

		return c.json({
			success: true,
			data: donation,
		});
	}
}