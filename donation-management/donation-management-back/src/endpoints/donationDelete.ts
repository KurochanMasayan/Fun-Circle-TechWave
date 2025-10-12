import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { type AppContext } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationDelete extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "Delete a donation (soft delete)",
		request: {
			params: z.object({
				donationId: Str({ description: "Donation ID" }),
			}),
		},
		responses: {
			"200": {
				description: "Donation deleted successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
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

		// 寄贈物の存在確認
		const { data: existingDonation, error: fetchError } = await supabase
			.from('donations')
			.select('id, status')
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

		// 貸出中の場合は削除を拒否
		if (existingDonation.status === 'lending') {
			return c.json(
				{
					success: false,
					error: "Cannot delete donation that is currently being borrowed",
				},
				{ status: 400 }
			);
		}

		// ソフトデリート実行
		const { error } = await supabase
			.from('donations')
			.update({
				deleted_at: new Date().toISOString(),
				status: 'deleted'
			})
			.eq('id', donationId);

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
			message: "Donation deleted successfully",
		});
	}
}