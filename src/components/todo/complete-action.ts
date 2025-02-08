'use server'

import {completedTodoSchema, state} from "@/components/todo/schema";
import {complete} from "@/db/todo";

export async function completeTodo(id: number, _state: state | null, form: FormData): Promise<state> {
    const data = completedTodoSchema.safeParse(Object.fromEntries(form.entries()));
    if (!data.success) {
        return {success: false, error: data.error.issues.map((issue) => issue.message).join("<br />\n")};
    }
    try {
        await complete(id, data.data.completed);
        return {success: true};
    } catch (error) {
        return {success: false, error: String(error)};
    }
}