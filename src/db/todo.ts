import {InferInsertModel, InferSelectModel} from "drizzle-orm";
import {todosTable} from "@/db/schema";
import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';

const db = drizzle(process.env.DB_FILE_NAME!);

export type Todo = InferSelectModel<typeof todosTable>;
export type NewTodo = InferInsertModel<typeof todosTable>;

export async function create (todo: NewTodo): Promise<Todo>{
    const entries = await db
        .insert(todosTable)
        .values(todo)
        .returning()

    const entry = entries.at(0)
    if (!entry) {
        throw new Error("failed to create todo item")
    }
    return entry
}

export async function list (): Promise<Todo[]>{
    return db.select().from(todosTable)
}