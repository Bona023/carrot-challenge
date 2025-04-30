"use server";

import { PASSWORD_HASHED_NUM, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH } from "@/lib/content";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z
    .object({
        email: z.string().email(),
        username: z.string().min(USERNAME_MIN_LENGTH, "Username must al least " + USERNAME_MIN_LENGTH + " characters."),
        password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string(),
    })
    .superRefine(async ({ username }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This username is already taken.",
                path: ["username"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This email is already taken.",
                path: ["email"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .refine(({ password, confirm_password }) => password === confirm_password, "Both passwords should be the same!");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateAccountAction(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    const result = await formSchema.spa(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const hashedPw = await bcrypt.hash(result.data.password, PASSWORD_HASHED_NUM);
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPw,
            },
            select: {
                id: true,
            },
        });
        const session = await getSession();
        session.id = user!.id;
        await session.save();
        redirect("/profile");
    }
}
