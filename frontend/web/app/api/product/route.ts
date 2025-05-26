import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


const API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: 'active' | 'inactive';
  stock: number;
  created_at: string;
  updated_at: string;
}

export async function getProducts(): Promise<Product[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/products`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'en'
    },
    next: { revalidate: 3600 } // ISR: إعادة التحقق كل ساعة
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch products');
  }

  return response.json();
}

export async function getProductDetails(id: number): Promise<Product> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Product not found');
  }

  return response.json();
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // هنا يمكنك معالجة البيانات وحفظها في قاعدة البيانات
    console.log('Received data:', {
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
      price: formData.get('price'),
      offerPrice: formData.get('offerPrice'),
      images: formData.getAll('images')
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}