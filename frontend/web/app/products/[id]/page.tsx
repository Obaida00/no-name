
'use client';
import { useParams } from 'next/navigation';
import Link from "next/link";
import { useProductDetails } from "@/hooks/use-product-details";
export default  function ProductDetail(
) {
  const params = useParams();
  const id = params?.id as string; 
  if (!id) {
    return <div>Error: Product ID is missing in URL</div>;
  }
  
  const { product, loading, error, refetch } = useProductDetails(id);
   if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  if (!product) {
    return <div>No product found</div>;
  }


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* قسم الصورة  */}
        <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>

        {/* قسم الاسم */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

       

          {/* الوصف */}
          <p className="mb-6 text-gray-700">{product.description}</p>

         {/* السعر */}
          {/* {product.price && (
            <div className="mb-6">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          )} */}

          {/* جدول المواصفات */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <tbody>
               {product.activeIngredient && (
                  <tr className="border-b">
                    <td className="py-2 font-medium">Active Ingredient</td>
                    <td className="py-2">{product.activeIngredient}</td>
                  </tr>
                )}
                {product.shape && (
                  <tr className="border-b">
                    <td className="py-2 font-medium">Shape</td>
                    <td className="py-2">{product.shape}</td>
                  </tr>
                )}
                {product.expDate && (
                  <tr className="border-b">
                    <td className="py-2 font-medium">Expiration Date</td>
                    <td className="py-2">{product.expDate
          ? new Date(product.expDate).toLocaleDateString()
          : "N/A"}</td>
                  </tr>
                )}
                 {product.createdAt && (
                  <tr className="border-b">
                    <td className="py-2 font-medium">Created At</td>
                    <td className="py-2">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* أزرار */}
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
