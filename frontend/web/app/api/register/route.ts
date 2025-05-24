import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const laravelResponse = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": "en"
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          password: body.password,
          passwordConfirmation: body.passwordConfirmation,
        }),
      }
    );

    const data = await laravelResponse.json();

    if (!laravelResponse.ok) {
      return NextResponse.json(data, { status: laravelResponse.status });
    }

    const token = data.token;

    const response = NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 }
    );

    response.cookies.delete("token");
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
