import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const laravelRes = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/user`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data: user } = await laravelRes.json();

    if (!laravelRes.ok) {
      return NextResponse.json(
        { message: "Laravel error" },
        { status: laravelRes.status }
      );
    }

    console.log("User fetched from Laravel:", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
