"use client";
import { ProductsTable } from "@/components/products-table";
import { useExpiredProducts } from "@/hooks/use-expired-products";
import Link from "next/link";

export default function ExpiredProductsPage() {
  const { expiredProducts, loading, error, refetch } = useExpiredProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>Error: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="flex w-full flex-col p-8">
      <div className="flex flex-col space-y-8">
        <h1 className="text-2xl font-bold">Expired Products</h1>
        <p className="text-muted-foreground">
          List of products that have expired
        </p>

        <div className="border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Expired
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expiredProducts.map((product) => {
                const expDate = new Date(product.expDate);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - expDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {expDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {diffDays} days ago
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {expiredProducts.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No expired products found
            </div>
          )}
        </div>
        <Link href={`/products`}>
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium">
            Back{" "}
          </button>
        </Link>
      </div>
    </main>
  );
}
