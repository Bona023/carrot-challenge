"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.string().min(5).max(100);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateTweet(prevState: any, formData: FormData) {
    const data = {
        tweet: formData.get("tweet") as string,
    };
    const result = tweetSchema.safeParse(data.tweet);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        const tweet = await db.tweet.create({
            data: {
                tweet: data.tweet,
                user: {
                    connect: {
                        id: session.id,
                    },
                },
            },
            select: { id: true },
        });
        if (!tweet) {
            return;
        } else {
            redirect(`/tweet/${tweet.id}`);
        }
    }
}
