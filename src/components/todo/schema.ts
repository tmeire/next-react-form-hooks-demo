import {z} from "zod";

export const schema = z.object({
    todo: z.string().nonempty(),
});