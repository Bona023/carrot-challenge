import db from "@/lib/db";
import Link from "next/link";

interface ListTweetProps {
    id: number;
    userId: number;
    tweet: string;
}

async function getWriter(id: number) {
    const username = db.user.findUnique({
        where: { id },
        select: {
            username: true,
        },
    });
    return username;
}

export default async function ListTweet({ id, userId, tweet }: ListTweetProps) {
    const user = await getWriter(userId);
    return (
        <Link href={`/tweet/${id}`}>
            <div className="w-full rounded-lg bg-white/40 p-3 grid grid-cols-1 gap-1 text-indigo-800 hover:bg-white/70">
                <span className="text-xs">Writer : {user?.username ?? "Anonymous"}</span>
                <span className="font-semibold">{tweet}</span>
            </div>
        </Link>
    );
}
