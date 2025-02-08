'use client'

import {useRouter} from "next/navigation";
import {useActionState, useEffect, useRef} from "react";
import {completeTodo} from "@/components/todo/complete-action";
import {Todo} from "@/db/todo";

export default function CompleteTodoForm({todo}: {todo: Todo}) {
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);

    const completeTodoWithId = completeTodo.bind(null, todo.id)
    const [state, formAction, isPending] = useActionState(completeTodoWithId, null);

    useEffect(() => {
        console.log(state)
        if (!isPending && state?.success) {
            router.refresh();
        }
    }, [isPending, router, state]);

    return (
        <form ref={formRef} action={formAction}>
            <input type="checkbox" name="completed" onClick={() => formRef.current?.requestSubmit()} />
        </form>
    )
}