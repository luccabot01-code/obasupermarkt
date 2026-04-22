import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  validateDemoAdminCredentials,
} from "@/lib/auth/demo-admin-user";

export async function POST(request: Request) {
  let body: { username?: string; password?: string; rememberMe?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!validateDemoAdminCredentials(username, password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const maxAge = body.rememberMe
    ? 60 * 60 * 24 * 30
    : 60 * 60 * 24 * 2;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
