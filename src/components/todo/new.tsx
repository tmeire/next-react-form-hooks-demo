'use client'

import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useActionState, useEffect} from "react";
import {schema} from "@/components/todo/schema";
import {addTodo} from "@/components/todo/new-action";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function NewTodoForm() {
    const router = useRouter();

    const form = useForm<z.output<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            todo: "",
        }
    });

    const [state, formAction, isPending] = useActionState(addTodo, null);

    useEffect(() => {
        if (!isPending && state?.success) {
            form.reset();
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
                            <FormLabel>Todo:</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {state?.error && (
                    <div className="text-[0.8rem] font-medium text-destructive">
                        {state.error}
                    </div>
                )}
                <Button type="submit" disabled={!form.formState.isValid}>
                    Add todo
                </Button>
            </form>
        </Form>
    )
}