import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/posts", "/users"];
const publicRoutes = ["/login", "/register"];

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname.split("/")[1] ? `/${req.nextUrl.pathname.split("/")[1]}` : "/";
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookieStore = await cookies();

    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);

    if(path === "/") {
        if(session?.userId) {
            return NextResponse.redirect(new URL("/posts", req.nextUrl));
        }
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if(isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/posts", req.nextUrl));
    }

    return NextResponse.next();
};