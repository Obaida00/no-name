import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

function getProductId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    return pathParts[pathParts.length - 1] || null;
  } catch (e) {
    console.error('Error parsing URL:', e);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API base URL not configured');
    }

    const productId = getProductId(request.url);
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
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
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API base URL not configured');
    }

    const productId = getProductId(request.url);
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const token = (await cookies()).get('token')?.value;

    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
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
    
    if (data.data) {
      data.data.categoryName = formData.get('categoryName') || data.data.category?.name;
      data.data.category_name = data.data.categoryName;
      if (!data.data.category) {
        data.data.category = {
          id: formData.get('categoryId'),
          name: formData.get('categoryName')
        };
      }
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API base URL not configured');
    }

    const productId = getProductId(request.url);
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const token = (await cookies()).get('token')?.value;

    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: errorData.message || 'Failed to delete product',
          details: errorData.errors || {}
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}