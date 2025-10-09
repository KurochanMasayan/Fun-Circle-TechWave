import { Num, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { type AppContext, Donation, Category, SubCategory, Location } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class DonationList extends OpenAPIRoute {
	schema = {
		tags: ["Donations"],
		summary: "List and search donations",
		request: {
			query: z.object({
				page: Num({
					description: "Page number (starts from 1)",
					default: 1,
				}),
				per_page: Num({
					description: "Items per page",
					default: 20,
				}),
				category_id: Str({
					description: "Filter by category ID",
					required: false,
				}),
				sub_category_id: Str({
					description: "Filter by sub-category ID", 
					required: false,
				}),
				status: z.enum(["available", "lending", "maintenance", "lost"]).optional().describe("Filter by status"),
				location_id: Str({
					description: "Filter by location ID",
					required: false,
				}),
				keyword: Str({
					description: "Keyword search in title, description, author",
					required: false,
				}),
				sort: z.enum(["created_at", "-created_at", "title", "-title", "popular"]).optional().default("created_at").describe("Sort order"),
			}),
		},
		responses: {
			"200": {
				description: "Returns a paginated list of donations",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							data: z.array(z.object({
								id: z.string(),
								title: z.string(),
								category: z.object({
									id: z.string(),
									name: z.string(),
								}),
								sub_category: z.object({
									id: z.string(),
									name: z.string(),
								}).optional(),
								status: z.enum(["available", "lending", "maintenance", "lost"]),
								location: z.object({
									id: z.string(),
									name: z.string(),
								}),
								donor_name: z.string().optional(),
								donated_date: z.string(),
								avg_rating: z.number().optional(),
								review_count: z.number().optional(),
								image_urls: z.array(z.string()).optional(),
							})),
							pagination: z.object({
								page: z.number(),
								per_page: z.number(),
								total: z.number(),
								total_pages: z.number(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const { 
			page, 
			per_page, 
			category_id, 
			sub_category_id, 
			status, 
			location_id, 
			keyword, 
			sort 
		} = data.query;

		const supabase = createSupabaseClient(c.env);

		let query = supabase
			.from('donations')
			.select(`
				id,
				title,
				status,
				donor_name,
				donated_date,
				categories!inner(id, name),
				sub_categories(id, name),
				locations!inner(id, name)
			`)
			.is('deleted_at', null);

		// Apply filters
		if (category_id) {
			query = query.eq('category_id', category_id);
		}
		if (sub_category_id) {
			query = query.eq('sub_category_id', sub_category_id);
		}
		if (status) {
			query = query.eq('status', status);
		}
		if (location_id) {
			query = query.eq('location_id', location_id);
		}

		// Keyword search
		if (keyword) {
			query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%,author.ilike.%${keyword}%`);
		}

		// Apply sorting
		switch (sort) {
			case "created_at":
				query = query.order('created_at', { ascending: true });
				break;
			case "-created_at":
				query = query.order('created_at', { ascending: false });
				break;
			case "title":
				query = query.order('title', { ascending: true });
				break;
			case "-title":
				query = query.order('title', { ascending: false });
				break;
			case "popular":
				// Note: For now, we'll sort by created_at desc as popular
				// In production, this would use a more complex query with lending counts
				query = query.order('created_at', { ascending: false });
				break;
			default:
				query = query.order('created_at', { ascending: false });
		}

		// Get total count for pagination
		const { count: totalCount, error: countError } = await supabase
			.from('donations')
			.select('*', { count: 'exact', head: true })
			.is('deleted_at', null);

		if (countError) {
			return c.json({
				success: false,
				error: countError.message,
			}, { status: 500 });
		}

		// Apply pagination
		const offset = (page - 1) * per_page;
		query = query.range(offset, offset + per_page - 1);

		const { data: donations, error } = await query;

		if (error) {
			return c.json({
				success: false,
				error: error.message,
			}, { status: 500 });
		}

		// Transform the data
		const transformedData = donations?.map((donation: any) => ({
			id: donation.id,
			title: donation.title,
			category: {
				id: donation.categories.id,
				name: donation.categories.name,
			},
			sub_category: donation.sub_categories ? {
				id: donation.sub_categories.id,
				name: donation.sub_categories.name,
			} : undefined,
			status: donation.status,
			location: {
				id: donation.locations.id,
				name: donation.locations.name,
			},
			donor_name: donation.donor_name,
			donated_date: donation.donated_date,
			// TODO: Add rating and review count from actual tables
			avg_rating: 0,
			review_count: 0,
			// TODO: Add image URLs from actual tables
			image_urls: [],
		})) || [];

		const totalPages = Math.ceil((totalCount || 0) / per_page);

		return c.json({
			success: true,
			data: transformedData,
			pagination: {
				page,
				per_page,
				total: totalCount || 0,
				total_pages: totalPages,
			},
		});
	}
}