import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({"message": "Unauthorized"}, {"status": 200});
        }
        const requestBody = request.json();
        const response = await fetch("REPLACE THIS WITH THE REAL REQUEST URL WHEN IT IS DONE", {
            method: "POST",
            body: JSON.stringify(
                requestBody
            ),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        });

        if (response.ok) {
            console.log("From Next Server: User is edited with success");
            return NextResponse.json({data: response.json(), status: 200});
        }
    } catch (error) {
        return NextResponse.json({message: "From Next Server: Error Processing request", error})
    }
}