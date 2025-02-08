'use server';

import NewTodoForm from "@/components/todo/new";
import {list} from "@/db/todo";
import CompleteTodoForm from "@/components/todo/complete";

export default async function Home() {
    const todos = await list(false);

    return (
        <div
            className="flex flex-col min-h-screen p-8 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold">Todo List</h1>
            <div className="text-left">
                {todos.map((todo) => {
                    return (
                        <div key={todo.id} className="flex flex-row space-x-2">
                            <CompleteTodoForm todo={todo} />
                            <div>{todo.todo}</div>
                        </div>
                    )
                })}
                {todos.length == 0 &&
                    <span>All done!</span>
                }
            </div>
            <NewTodoForm/>
        </div>
    );
}
