
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Upload, Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// export default function AddProductPage() {
//   const router = useRouter();
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     category: 'Earphone',
//     price: '',
//     offerPrice: '',
//     images: [] as File[]
//   });

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     if (e.target.files && e.target.files[0]) {
//       const newImages = [...product.images];
//       newImages[index] = e.target.files[0];
//       setProduct({...product, images: newImages});
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const formData = new FormData();
//       formData.append('name', product.name);
//       formData.append('description', product.description);
//       formData.append('category', product.category);
//       formData.append('price', product.price);
//       formData.append('offerPrice', product.offerPrice);
//       product.images.forEach(image => {
//         if (image) formData.append('images', image);
//       });

//       const response = await fetch('/api/products', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         toast.success('Product added successfully');
//         router.push('/products');
//       } else {
//         throw new Error('Failed to add product');
//       }
//     } catch (error) {
//       toast.error('Error adding product');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* قسم صور المنتج */}
//         <div>
//           <Label htmlFor="images" className="block mb-4">Product Images</Label>
//           <div className="grid grid-cols-4 gap-4">
//             {[0, 1, 2, 3].map((index) => (
//               <div key={index} className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-32">
//                 {product.images[index] ? (
//                   <img 
//                     src={URL.createObjectURL(product.images[index])} 
//                     alt={`Preview ${index}`}
//                     className="h-full w-full object-cover rounded-md"
//                   />
//                 ) : (
//                   <label className="flex flex-col items-center justify-center cursor-pointer">
//                     <Upload className="h-6 w-6 mb-2 text-gray-400" />
//                     <span className="text-sm text-gray-500">Upload</span>
//                     <input 
//                       type="file" 
//                       className="hidden" 
//                       onChange={(e) => handleImageUpload(e, index)}
//                       accept="image/*"
//                     />
//                   </label>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* قسم اسم المنتج */}
//         <div>
//           <Label htmlFor="name" className="block mb-2">Product Name</Label>
//           <Input
//             id="name"
//             placeholder="Type here"
//             value={product.name}
//             onChange={(e) => setProduct({...product, name: e.target.value})}
//             required
//           />
//         </div>

//         {/* قسم وصف المنتج */}
//         <div>
//           <Label htmlFor="description" className="block mb-2">Product Description</Label>
//           <Textarea
//             id="description"
//             placeholder="Type here"
//             rows={4}
//             value={product.description}
//             onChange={(e) => setProduct({...product, description: e.target.value})}
//             required
//           />
//         </div>

//         {/* قسم الفئة والسعر */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label htmlFor="category" className="block mb-2">Category</Label>
//             <select
//               id="category"
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//               value={product.category}
//               onChange={(e) => setProduct({...product, category: e.target.value})}
//             >
//               <option value="Earphone">Earphone</option>
//               <option value="Smartphone">Smartphone</option>
//               <option value="Laptop">Laptop</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//           </div>

//           <div>
//             <Label htmlFor="price" className="block mb-2">Product Price ($)</Label>
//             <Input
//               id="price"
//               type="number"
//               placeholder="0.00"
//               value={product.price}
//               onChange={(e) => setProduct({...product, price: e.target.value})}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="offerPrice" className="block mb-2">Offer Price ($)</Label>
//             <Input
//               id="offerPrice"
//               type="number"
//               placeholder="0.00"
//               value={product.offerPrice}
//               onChange={(e) => setProduct({...product, offerPrice: e.target.value})}
//             />
//           </div>
//         </div>

//         {/* زر الإضافة */}
//         <div className="flex justify-end">
//           <Button type="submit" size="lg" className="mt-6">
//             <Plus className="mr-2 h-4 w-4" />
//             ADD PRODUCT
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }




















'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: 'Anti-inflammatory drugs',
    price: '',
    activeIngedient:'',
    quantity: '',
    shape:'',
    images: [] as File[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...product.images];
      newImages[index] = e.target.files[0];
      setProduct({...product, images: newImages});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('activeIngedient', product.activeIngedient);

      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
      formData.append('shape', product.shape);

      product.images.forEach(image => {
        if (image) formData.append('images', image);
      });

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Product added successfully');
        router.push('/products');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      toast.error('Error adding product');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* قسم صور المنتج */}
        <div>
          <Label htmlFor="images" className="block mb-4">Product Images</Label>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-32">
                {product.images[index] ? (
                  <img 
                    src={URL.createObjectURL(product.images[index])} 
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, index)}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* قسم اسم المنتج */}
        <div>
          <Label htmlFor="name" className="block mb-2">Product Name</Label>
          <Input
            id="name"
            placeholder="Type here"
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            required
          />
        </div>

        {/* قسم وصف المنتج */}
        <div>
          <Label htmlFor="description" className="block mb-2">Product Description</Label>
          <Textarea
            id="description"
            placeholder="Type here"
            rows={4}
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            required
          />
        </div>

        {/* قسم الفئة والسعر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="category" className="block mb-2">Category</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
            >
              <option value="Anti-inflammatory drugs">Anti-inflammatory drugs</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <Label htmlFor="activeIngedient" className="block mb-2">Active Ingedient</Label>
            <Input
              id="activeIngedient"
            //   type="number"
              placeholder="Type here"
              value={product.activeIngedient}
              onChange={(e) => setProduct({...product, activeIngedient: e.target.value})}
            />
          </div>



          <div>
            <Label htmlFor="price" className="block mb-2">Product Price ($)</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="block mb-2">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="0.0"
              value={product.quantity}
              onChange={(e) => setProduct({...product, quantity: e.target.value})}
            />
          </div>
          {/* <div>
            <Label htmlFor="shape" className="block mb-2">Shape</Label>
            <select
              id="shape"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={product.shape}
              onChange={(e) => setProduct({...product, shape: e.target.value})}
            >
              <option value="Earphone">Earphone</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div> */}
        </div>

        {/* زر الإضافة */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="mt-6">
            <Plus className="mr-2 h-4 w-4" />
            ADD PRODUCT
          </Button>
        </div>
      </form>
    </div>
  );
}