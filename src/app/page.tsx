'use server';

import NewTodoForm from "@/components/todo/new";
import {list} from "@/db/todo";

export default async function Home() {
    const todos = await list();

    return (
        <div
            className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Todo List</h1>
            <div className="text-left">
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <span>{todo.id}: {todo.todo}</span>
                        </div>
                    )
                })}
            </div>
            <NewTodoForm/>
        </div>
    );
}
