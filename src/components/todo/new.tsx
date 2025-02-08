'use client'

import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useActionState, useEffect} from "react";
import {newTodoSchema} from "@/components/todo/schema";
import {addTodo} from "@/components/todo/new-action";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function NewTodoForm() {
    const router = useRouter();

    // The form hook performs form validation using the zod schema whenever the form values change
    const form = useForm<z.output<typeof newTodoSchema>>({
        resolver: zodResolver(newTodoSchema),
        mode: "onChange",
        defaultValues: {
            todo: "",
        }
    });

    // The action state wraps the server action and exposes the response value as the state
    const [state, formAction, isPending] = useActionState(addTodo, null);

    // By relying on both the action submission (isPending) and the action result (state.success), the effect is
    // triggered on every form submission. Without the dependency on the action submission, the effect would not
    // trigger as the value of state.success does not change on two subsequent successful form submissions.
    useEffect(() => {
        if (!isPending && state?.success) {
            // Clear the values
            form.reset();
            // Refresh the current page to load new values.
            // Could be modified to redirect to a new page.
            router.refresh();
        }
    }, [form, isPending, router, state]);

    return (
        <Form {...form}>
            <form className="space-y-2" action={formAction}>
                <FormField
                    control={form.control}
                    name="todo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New todo:</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*Show the error from the server action*/}
                {state?.error && (
                    <div className="text-[0.8rem] font-medium text-destructive">
                        {state.error}
                    </div>
                )}
                {/*Disabling the submit button by hooking into the form state to prevent bad submissions*/}
                <Button type="submit" disabled={!form.formState.isValid}>
                    Add todo
                </Button>
            </form>
        </Form>
    )
}