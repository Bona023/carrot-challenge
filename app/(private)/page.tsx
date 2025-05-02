import ListTweet from "@/components/tweet";
import db from "@/lib/db";

async function getTweets() {
    const tweets = await db.tweet.findMany({
        select: {
            id: true,
            tweet: true,
            userId: true,
            created_at: true,
        },
    });
    return tweets;
}

export default async function Home() {
    const tweets = await getTweets();
    return (
        <div className="bg-box">
            <div className="text-center py-4">
                <h1 className="text-3xl font-bold text-white">Home</h1>
            </div>
            <div className="flex flex-col gap-3 py-3">
                {tweets.map((tweet) => (
                    <ListTweet
                        key={tweet.id}
                        {...tweet}
                    />
                ))}
            </div>
        </div>
    );
}
