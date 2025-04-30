import Link from "next/link";

export default function Home() {
    return (
        <div className="bg-box">
            <div className="py-12 text-center mb-50">
                <h1 className="font-bold text-white text-5xl">Home</h1>
            </div>
            <div className="grid grid-cols-1 gap-14">
                <Link
                    href="/create-account"
                    className="form-btn"
                >
                    Sign Up
                </Link>
                <Link
                    href="log-in"
                    className="form-btn"
                >
                    Log In
                </Link>
            </div>
        </div>
    );
}
