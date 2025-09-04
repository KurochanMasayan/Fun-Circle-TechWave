import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class TaskList extends OpenAPIRoute {
	schema = {
		tags: ["Tasks"],
		summary: "List Tasks",
		request: {
			query: z.object({
				page: Num({
					description: "Page number",
					default: 0,
				}),
				isCompleted: Bool({
					description: "Filter by completed flag",
					required: false,
				}),
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of tasks",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									tasks: Task.array(),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated parameters
		const { page, isCompleted } = data.query;

		// Supabaseからタスク一覧を取得
		const supabase = createSupabaseClient(c.env);
		const { data: tasks, error } = await supabase
			.from('tasks')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			return c.json(
				{
					success: false,
					error: error.message,
				},
				{
					status: 500,
				},
			);
		}

		return {
			success: true,
			tasks: tasks || [],
		};
	}
}
