


import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API base URL not configured');
    }

    
    const productId = params.id;
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }


    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
       const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch product' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}






export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API base URL not configured');
    }

    const productId = params.id;
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    formData.append('_method', 'PUT'); 

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
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





export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!API_BASE_URL) {
      throw new Error('LARAVEL_API_BASE_URL is not defined');
    }

    const productId = params.id;
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to delete product' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}