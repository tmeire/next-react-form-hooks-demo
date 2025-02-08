'use server'

import {newTodoSchema, state} from "@/components/todo/schema";
import {create} from "@/db/todo";

export async function addTodo(_state: state | null, form: FormData): Promise<state> {
    // Use the same zof schema as the frontend to parse the form data
    const data = newTodoSchema.safeParse(Object.fromEntries(form.entries()));
    if (!data.success) {
        return {success: false, error: data.error.issues.map((issue) => issue.message).join("<br />\n")};
    }
    try {
        // Call a database function to store the todo
        await create(data.data);
        return {success: true};
    } catch (error) {
        return {success: false, error: String(error)};
    }
}
