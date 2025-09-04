import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";
import { createSupabaseClient } from "../lib/supabase";

export class TaskCreate extends OpenAPIRoute {
	schema = {
		tags: ["Tasks"],
		summary: "Create a new Task",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Task,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the created task",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									task: Task,
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

		// Retrieve the validated request body
		const taskToCreate = data.body;

		// Supabaseにタスクを挿入
		const supabase = createSupabaseClient(c.env);
		const { data: newTask, error } = await supabase
			.from('tasks')
			.insert([{
				name: taskToCreate.name,
				slug: taskToCreate.slug,
				description: taskToCreate.description,
				completed: taskToCreate.completed,
				due_date: taskToCreate.due_date,
			}])
			.select()
			.single();

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

		// return the new task
		return {
			success: true,
			task: newTask,
		};
	}
}
