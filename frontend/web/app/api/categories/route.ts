import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

export async function GET() {
  try {
    if (!API_BASE_URL) {
      throw new Error('LARAVEL_API_BASE_URL is not defined');
    }

    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Accept-Language':'en',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
      throw new Error('Invalid data format: expected array');
    }
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to load categories' },
      { status: 500 }
    );
  }
}



