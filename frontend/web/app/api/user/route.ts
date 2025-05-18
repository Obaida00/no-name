import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    console.log(token);
    
    if (!token) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const laravelRes = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/user`,
      {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept-Language" : "en",
        },
      }
    );

    const data = await laravelRes.json();
    console.log(data.user.email)
    if (!laravelRes.ok) {
      return NextResponse.json(data, { status: laravelRes.status });
    }

    return NextResponse.json(data, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
