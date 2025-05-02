"use client";
import { HomeIcon as OutlineHome, UserIcon as OutlineUser, ChatBubbleBottomCenterTextIcon as OutlineChat } from "@heroicons/react/24/outline";
import { HomeIcon as SolidHome, UserIcon as SolidUser, ChatBubbleBottomCenterTextIcon as SolidChat } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className="w-[400px] fixed bottom-0 pt-3.5 pb-2 flex justify-between items-center px-10 text-[#3468C0]">
            <Link
                href="/"
                className="flex flex-col items-center justify-end"
            >
                {pathname === "/" ? <SolidHome className="size-8" /> : <OutlineHome className="size-8" />}
                <span className="text-xs">Home</span>
            </Link>
            <Link
                href="/tweet"
                className="flex flex-col items-center justify-end"
            >
                {pathname === "/tweet" ? <SolidChat className="size-8" /> : <OutlineChat className="size-8" />}
                <span className="text-xs">Tweet</span>
            </Link>
            <Link
                href="/profile"
                className="flex flex-col items-center justify-end"
            >
                {pathname === "/profile" ? <SolidUser className="size-8" /> : <OutlineUser className="size-8" />}
                <span className="text-xs">My</span>
            </Link>
        </div>
    );
}
