import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
const key = new TextEncoder().encode(process.env.JWT_SECRET || "development-only-secret-change-me");
export type Session = { id: string; name: string; role: "admin" | "user" };
export async function signSession(user: Session) { return new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key); }
export async function sessionFromRequest(req: NextRequest): Promise<Session | null> { try { const token = req.cookies.get("sg_session")?.value; if (!token) return null; return (await jwtVerify(token, key)).payload as unknown as Session; } catch { return null; } }
export async function getSession(): Promise<Session | null> { try { const token = (await cookies()).get("sg_session")?.value; if (!token) return null; return (await jwtVerify(token, key)).payload as unknown as Session; } catch { return null; } }
