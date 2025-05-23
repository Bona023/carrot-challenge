import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrl: Routes = {
    "/landing": true,
    "/log-in": true,
    "/create-account": true,
};

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrl[request.nextUrl.pathname];
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/landing", request.url));
        }
    } else {
        if (exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
