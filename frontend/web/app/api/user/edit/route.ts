import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({"message": "Unauthorized"}, {"status": 200});
        }
        const requestBody = await request.json();
        const response = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/users/${requestBody.id}`, {
            method: "PUT",
            body: JSON.stringify(
                requestBody
            ),
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

if (response.ok) {
            console.log("From Next Server: User is edited with success");
            const data = await response.json();
            return NextResponse.json({data: data, status: 200});
        }
    } catch (error) {
        return NextResponse.json({message: "From Next Server: Error Processing request", error})
    }
}        