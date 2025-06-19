import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

export async function GET(request: Request) {
  try {
//..............
     if (!API_BASE_URL) {
      throw new Error('❌ LARAVEL_API_BASE_URL is not defined');
    }
//...............
   const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('per_page')) || 15;
;    const searchTerm = searchParams.get('search');

 let url = `${API_BASE_URL}/api/products?page=${page}&per_page=${perPage}`;
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    const res = await fetch(url, {
        method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
      //  '  Content-Type': 'application/json',
        //  'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQ4NTQ4NTU4LCJleHAiOjE3NDg1NTIxNTgsIm5iZiI6MTc0ODU0ODU1OCwianRpIjoiWHBzb3lnakZueG5oUUJWVSIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.IIgnZrbI1hp6aTgdkGRvPbhSQJXMacGFIXcoV7K78F4`,
      }
      , 
     
    });
        console.log('API Response Status:', res.status);


    if (!res.ok) {

      const errorData = await res.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`API Error: ${res.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    return NextResponse.json({
      data: data.data,
        meta: {
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
        from: data.from,
        to: data.to,
      },
    });
  } catch (error) {
    console.error('API Route Error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );

    
  }}












  



  




export async function POST(request: Request) { 
  try {
    if (!API_BASE_URL) {
      throw new Error('❌ LARAVEL_API_BASE_URL is not defined');
    }

    const formData = await request.formData();
    
    
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to create product' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}








export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!API_BASE_URL) {
      throw new Error('LARAVEL_API_BASE_URL is not defined');
    }

    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    const formData = await request.formData();
    
    
    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/api/products/${params.id}`, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to update product' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}






















