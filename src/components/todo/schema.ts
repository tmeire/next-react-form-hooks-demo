import {z} from "zod";

export const newTodoSchema = z.object({
    todo: z.string().nonempty(),
});

export const completedTodoSchema = z.object({
    completed: z.coerce.boolean(),
});

export type state = {
    success: boolean,
    error?: string,
}