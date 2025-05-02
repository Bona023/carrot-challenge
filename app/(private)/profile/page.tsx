import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logout = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    };
    return (
        <div className="bg-box">
            <div>
                <h1 className="text-white text-4xl font-bold">Hi! {user?.username}!</h1>
            </div>
            <form
                className="w-full grid grid-cols-1 pt-60"
                action={logout}
            >
                <button className="form-btn">Log Out</button>
            </form>
        </div>
    );
}
