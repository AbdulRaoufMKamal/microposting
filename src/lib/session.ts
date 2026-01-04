import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: string;
    expiresAt: Date;
}

export async function isSessionExpired() {
    const session = await getSession();
    return session === null;
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
        return null;
    }
    const payload : SessionPayload | undefined = await decrypt(session);
    if (!payload) {
        return null;
    }
    const expiresAt = new Date(payload.expiresAt);
    if (expiresAt < new Date()) {
        return null;
    }
    return payload;
}

export async function createSession(userId: string) {
    const cookieStore = await cookies();

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });

}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}



export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as SessionPayload;
    } catch (error) {
        console.log("Failed to verify session");
    }
}