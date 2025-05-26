// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Upload, Save, X, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   offerPrice?: number;
//   status: 'Active' | 'Inactive';
//   totalSales: number;
//   category: string;
//   images: string[];
// }

// export default function EditProductPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [newImages, setNewImages] = useState<File[]>([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/products/${id}`);
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         toast.error('Failed to load product');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     if (e.target.files && e.target.files[0]) {
//       const updatedNewImages = [...newImages];
//       updatedNewImages[index] = e.target.files[0];
//       setNewImages(updatedNewImages);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     if (!product) return;
    
//     const updatedImages = [...product.images];
//     updatedImages.splice(index, 1);
//     setProduct({...product, images: updatedImages});
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product) return;

//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('name', product.name);
//       formData.append('description', product.description);
//       formData.append('price', product.price.toString());
//       formData.append('status', product.status);
//       formData.append('category', product.category);
      
//       if (product.offerPrice) {
//         formData.append('offerPrice', product.offerPrice.toString());
//       }

//       // إضافة الصور الجديدة
//       newImages.forEach(image => {
//         if (image) formData.append('images', image);
//       });

//       // إضافة روابط الصور الحالية
//       product.images.forEach(image => {
//         formData.append('existingImages', image);
//       });

//       const response = await fetch(`/api/products/${id}`, {
//         method: 'PUT',
//         body: formData
//       });

//       if (response.ok) {
//         toast.success('Product updated successfully');
//         router.push('/products');
//       } else {
//         throw new Error('Failed to update product');
//       }
//     } catch (error) {
//       toast.error('Error updating product');
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Edit Product</h1>
//         <Button variant="outline" onClick={() => router.back()}>
//           <X className="mr-2 h-4 w-4" />
//           Cancel
//         </Button>
//       </div>
      
//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Product Images */}
//         <div>
//           <Label>Product Images</Label>
//           <div className="grid grid-cols-4 gap-4 mt-2">
//             {[...product.images, ...Array(4 - product.images.length)].map((img, index) => (
//               <div key={index} className="border-2 border-dashed rounded-lg h-40 flex flex-col">
//                 {img ? (
//                   <div className="relative flex-1">
//                     <img
//                       src={img}
//                       alt={`Product ${index}`}
//                       className="h-full w-full object-cover rounded-t-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveImage(index)}
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex-1 flex flex-col items-center justify-center cursor-pointer p-4">
//                     <Upload className="h-6 w-6 mb-2 text-gray-400" />
//                     <span className="text-sm text-gray-500 text-center">Upload Image</span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleImageChange(e, index)}
//                       accept="image/*"
//                     />
//                   </label>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Name */}
//         <div>
//           <Label htmlFor="name">Product Name</Label>
//           <Input
//             id="name"
//             value={product.name}
//             onChange={(e) => setProduct({...product, name: e.target.value})}
//             className="mt-2"
//             required
//           />
//         </div>

//         {/* Product Description */}
//         <div>
//           <Label htmlFor="description">Product Description</Label>
//           <Textarea
//             id="description"
//             value={product.description}
//             onChange={(e) => setProduct({...product, description: e.target.value})}
//             className="mt-2"
//             rows={4}
//             required
//           />
//         </div>

//         {/* Product Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Status */}
//           <div>
//             <Label htmlFor="status">Status</Label>
//             <select
//               id="status"
//               value={product.status}
//               onChange={(e) => setProduct({
//                 ...product, 
//                 status: e.target.value as 'Active' | 'Inactive'
//               })}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
//               required
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Category */}
//           <div>
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={product.category}
//               onChange={(e) => setProduct({...product, category: e.target.value})}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
//               required
//             >
//               <option value="Earphone">Earphone</option>
//               <option value="Smartphone">Smartphone</option>
//               <option value="Laptop">Laptop</option>
//               <option value="TV">TV</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//           </div>

//           {/* Price */}
//           <div>
//             <Label htmlFor="price">Price ($)</Label>
//             <Input
//               id="price"
//               type="number"
//               value={product.price}
//               onChange={(e) => setProduct({...product, price: Number(e.target.value)})}
//               className="mt-2"
//               required
//             />
//           </div>

//           {/* Offer Price */}
//           <div>
//             <Label htmlFor="offerPrice">Offer Price ($)</Label>
//             <Input
//               id="offerPrice"
//               type="number"
//               value={product.offerPrice || ''}
//               onChange={(e) => setProduct({
//                 ...product, 
//                 offerPrice: e.target.value ? Number(e.target.value) : undefined
//               })}
//               className="mt-2"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <Save className="mr-2 h-4 w-4" />
//             )}
//             Save Changes
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, X, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

// بيانات وهمية للمنتجات
const mockProducts = [
  {
    id: '1',
    name: 'Smartphone X Pro',
    description: 'Flagship smartphone with advanced camera',
    price: 999,
    activeIngedient:'Tramadole',
    status: 'Active',
    category: 'Smartphone',
    images: ['/placeholder-smartphone.jpg']
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    description: 'Noise-cancelling wireless earbuds',
    price: 199,
    activeIngedient:'Tramadole',

    status: 'Active',
    category: 'Earphone',
    images: ['/placeholder-earbuds.jpg']
  }
];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(() => {
    return mockProducts.find(p => p.id === id) || mockProducts[0];
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة عملية الحفظ
    setTimeout(() => {
      toast.success('تم حفظ التغييرات (بيانات وهمية)');
      setIsSubmitting(false);
      router.push('/products');
    }, 1000);
  };

  
  if (!product) {
    return <div className="p-6 text-red-500">المنتج غير موجود</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Product </h1>
        <Button variant="outline" onClick={() => router.back()}>
          <X className="ml-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* صور المنتج */}
        <div>
          <Label>Product image </Label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {product.images.map((img, index) => (
              <div key={index} className="border rounded-lg h-40 relative">
                <img
                  src={img}
                  alt={`image product${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
            <div className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center">
              <label className="flex flex-col items-center cursor-pointer p-4">
                <Upload className="h-6 w-6 mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">image </span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* اسم المنتج */}
        <div>
          <Label>Product Name </Label>
          <Input
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            className="mt-2"
            required
          />
        </div>

        {/* وصف المنتج */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            className="mt-2"
            rows={4}
            required
          />
        </div>

        {/* التفاصيل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

             {/* التركيبة الدوائية  */}
          <div>
            <Label>Active Ingedient </Label>
            <Input
            //   type="number"
              value={product.activeIngedient}
              onChange={(e) => setProduct({...product, activeIngedient: e.target.value})}
              className="mt-2"
              required
            />
          </div>
          {/* الحالة */}
          <div>
            <Label>Status</Label>
            <select
              value={product.status}
              onChange={(e) => setProduct({...product, status: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
            >
              <option value="Active">active</option>
              <option value="Inactive">غير نشط</option>
            </select>
          </div>

          {/* الفئة */}
          <div>
            <Label>Category</Label>
            <select
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
            >
              <option value="Smartphone">Laptop </option>
              <option value="Earphone">سماعات</option>
              <option value="Laptop">لابتوب</option>
            </select>
          </div>

          {/* السعر */}
          <div>
            <Label>Price ($)</Label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({...product, price: Number(e.target.value)})}
              className="mt-2"
              required
            />
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="ml-2 h-4 w-4" />
            )}
Save Changes          </Button>
        </div>
      </form>
    </div>
  );
}