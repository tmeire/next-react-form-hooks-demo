'use server'

import {schema} from "@/components/todo/schema";
import {create} from "@/db/todo";

export type state = {
    success: boolean,
    error?: string,
}

export async function addTodo(_state: state | null, form: FormData): Promise<state> {
    const data = schema.safeParse(Object.fromEntries(form.entries()));
    if (!data.success) {
        return {success: false, error: data.error.issues.map((issue) => issue.message).join("<br />\n")};
    }
    try {
        await create(data.data);
        return {success: true};
    } catch (error) {
        return {success: false, error: String(error)};
    }
}