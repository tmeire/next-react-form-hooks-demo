import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
    id: int({mode:"number"}).primaryKey({ autoIncrement: true }),
    todo: text().notNull(),
    completed: int({mode: "boolean"}).default(false),
    createdAt: int({mode:"timestamp"}).$defaultFn(() => new Date()),
});