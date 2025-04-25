"use server";

import { z } from "zod";

const pwRegex = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
    email: z
        .string()
        .email()
        .refine((email) => email.includes("@zod.com"), { message: "Only @zod.com emails are allowed." }),
    username: z.string().min(5, "Username must al least 5 characters."),
    password: z.string().min(10, "Password must at least 10 characters.").regex(pwRegex, "Password is must include at least one number."),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const result = formSchema.safeParse(data);
    if (result.success) {
        return {
            success: result.success,
        };
    } else {
        return {
            success: result.success,
            errors: result.error.flatten(),
        };
    }
}
