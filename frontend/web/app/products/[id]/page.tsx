// import { getProductById } from '@/lib/api/products';
// import { Star, ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await getProductById(params.id);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm text-gray-500 mb-6">
//         <Link href="/" className="hover:text-primary">Home</Link>
//         <ChevronRight className="mx-2 h-4 w-4" />
//         <Link href="/products" className="hover:text-primary">Products</Link>
//         <ChevronRight className="mx-2 h-4 w-4" />
//         <span className="text-primary">{product.name}</span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Gallery */}
//         <div className="space-y-4">
//           <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={500}
//               height={500}
//               className="object-contain"
//             />
//           </div>
//           <div className="grid grid-cols-4 gap-2">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="bg-gray-100 rounded-md aspect-square cursor-pointer">
//                 {/* يمكن استبدالها بصور مصغرة حقيقية */}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

//           {/* Rating */}
//           <div className="flex items-center mb-4">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
//                 />
//               ))}
//             </div>
//             <span className="ml-2 text-sm text-gray-600">
//               ({product.rating.toFixed(1)})
//             </span>
//           </div>

//           {/* Description */}
//           <p className="text-gray-700 mb-6">{product.description}</p>

//           {/* Pricing */}
//           <div className="mb-6">
//             <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
//             {product.originalPrice && (
//               <span className="ml-2 text-lg text-gray-500 line-through">
//                 ${product.originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>

//           {/* Specifications */}
//           <div className="mb-8">
//             <table className="w-full border-collapse">
//               <tbody>
//                 <tr className="border-b">
//                   <td className="py-2 font-medium">Brand</td>
//                   <td className="py-2">{product.brand}</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-2 font-medium">Color</td>
//                   <td className="py-2">{product.color}</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-2 font-medium">Category</td>
//                   <td className="py-2">{product.category}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4">
//             <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
//               <ShoppingCart className="mr-2 h-5 w-5" />
//               Add to Cart
//             </Button>
//             <Button className="bg-black hover:bg-gray-800 px-8 py-3">
//               Buy now
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { notFound } from "next/navigation";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  brand: string;
  color: string;
  category: string;
  activeIngedient: string;
  shape: string;
  expDate:string;

  
}

async function getProduct(id: string): Promise<Product | null> {
  // هنا يمكنك جلب البيانات من API أو قاعدة بيانات
  const products: Product[] = [
    {
      id: "1",
      name: "Smartphone X Pro",
      description:
        "The Smartphone X Pro is an advanced smartphone that combines high performance with sleek design. It features a 6.7-inch AMOLED display with high resolution, providing an stunning visual experience. The device is powered by a robust processor that ensures fast performance and efficient energy consumption, along with a triple rear camera setup with 108 megapixels, allowing you to capture stunning photos in various conditions. Additionally, the phone supports fast charging technology, making it ideal for daily use.",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.5,
      brand: "Smartphone X",
      color: "Glossy Black, Metallic Silver, Sky Blue",
      category: "Smartphones",
      activeIngedient: "Tramadole",
      shape: "Tablet",
      expDate:"6/23/2024"
    },
    // ... منتجات أخرى
  ];

  return products.find((product) => product.id === id) || null;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* قسم الصورة (يمكنك استبداله بعنصر صورة حقيقي) */}
        <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>

        {/* قسم التفاصيل */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* التقييم */}
          {/* <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div> */}

          {/* الوصف */}
          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* السعر */}
          <div className="mb-6">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {/* {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )} */}
          </div>

          {/* جدول المواصفات */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Category</td>
                  <td className="py-2">{product.category}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">active Ingedient</td>
                  <td className="py-2">{product.activeIngedient}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Shape</td>
                  <td className="py-2">{product.shape}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">ExpDate</td>
                  <td className="py-2">{product.expDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* أزرار الشراء */}
          <div className="flex space-x-4">
            <Link href={`/products/${product.id}/edit`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"  >
              Edit{" "}
            </button>
            </Link>
            <Link href={`/products`}>
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium">
              Back{" "}
            </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
