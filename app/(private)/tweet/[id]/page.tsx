import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
    const tweet = db.tweet.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
    });
    return tweet;
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const tweet = await getTweet(id);
    if (!tweet) {
        return notFound();
    }
    return (
        <div className="px-8 pt-10 pb-20 flex flex-col gap-2">
            <span>writer: {tweet.user.username}</span>
            <span className="text-indigo-800 font-semibold">{tweet.tweet}</span>
        </div>
    );
}
