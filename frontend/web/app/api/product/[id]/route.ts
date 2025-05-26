import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    
    // هنا يمكنك معالجة البيانات وتحديث المنتج في قاعدة البيانات
    console.log('Updating product:', {
      id: params.id,
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      offerPrice: formData.get('offerPrice'),
      status: formData.get('status'),
      category: formData.get('category'),
      existingImages: formData.getAll('existingImages'),
      newImages: formData.getAll('images')
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

