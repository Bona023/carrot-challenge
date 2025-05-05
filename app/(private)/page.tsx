import AddTweet from "@/components/add-tweet";
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
            <AddTweet />
            <div className="flex flex-col gap-3 py-3 h-[55vh] overflow-y-auto scrollbar-hidden">
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
