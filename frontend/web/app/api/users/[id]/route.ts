// THIS IS FOR A SINGLE USER.

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get("token")?.value;
  try {
    if (!token) {
      return NextResponse.json({
        message: `token not valid ${token}`,
        status: 401,
      });
    }
    
    const laravelResponse = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/users/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (laravelResponse.status === 401) {
      return NextResponse.json({
        message: "Serverly Unauthorized",
        status: 401,
      });
    }
    const data = await laravelResponse.json();
    const response = NextResponse.json({user: data.user,  status: 200 });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error in GET /api/users/[id]" + error });
  }
}


///WE WILL DISCUSS THIS LATER ON.
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get("token")?.value;
  try {
    if (!token) {
      return NextResponse.json({
        message: " Tokenly Unauthorized",
        status: 401,
      });
    }
    // const body = await request.json();
    const laravelResponse = await fetch(
      `${process.env.LARAVEL_API_BASE_URL}/api/users/${params.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // "Accept-Language" : "en",
        },
        // body: JSON.stringify({
        //   name: body.name,
        //   email: body.email,
        //   address: body.address,
        //   gender: body.gender,
        //   age: body.age,
        // }),
      }
    );
    if (laravelResponse.status === 401) {
      return NextResponse.json({
        message: "Serverly Unauthorized",
        status: 401,
      });
    }
    const data = await laravelResponse.json();
    const response = NextResponse.json({user: data.user, status: 200 });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error in PUT /api/users/[id]" + error });
  }
}