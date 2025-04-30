"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExist = async (email: string) => {
    const user = await db.user.findUnique({
        where: { email },
        select: { id: true },
    });
    return Boolean(user);
};

const formSchema = z.object({
    email: z.string().email().refine(checkEmailExist, "An account with this email dose no exist."),
    password: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const result = await formSchema.spa(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const user = await db.user.findUnique({
            where: { email: result.data.email },
            select: {
                id: true,
                password: true,
            },
        });
        const rightPw = await bcrypt.compare(result.data.password, user!.password ?? "XX");
        if (rightPw) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");
        } else {
            return {
                fieldErrors: {
                    password: ["Wrong Password"],
                    email: [],
                },
            };
        }
    }
}
