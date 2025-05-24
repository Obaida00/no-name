import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const laravelRes = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" , "Accept": "application/json", "Accept-Language" : "en",},
    body: JSON.stringify(body),
  });

  const data = await laravelRes.json();

  if (!laravelRes.ok) {
    return NextResponse.json(
      { message: data.message || "Login Failed" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ message: "Logged in successfully" });
  console.log("My res token is: "+data.token);
  
  response.cookies.delete("token");
  response.cookies.set("token", data.token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, //7 days.
  });

  return response;
}
