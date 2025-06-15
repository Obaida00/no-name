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
        method: "GET",
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const requestBody = await request.json();    
    const response = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      return NextResponse.json("error");
    }
      const data = await response.json();
      return NextResponse.json({ user: data.data, status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "From Next Server: Error Processing request",
      error,
    });
  }
}
