"use client";
import { ProductsTable } from "@/components/products-table";
import { useExpiringProducts } from "@/hooks/use-expiring-products";
import Link from "next/link";

export default function ExpiringProductsPage() {
  const { expiringProducts, loading, error } = useExpiringProducts();

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
      </div>
    );
  }

  return (
    <main className="flex w-full flex-col p-8">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expiring Soon Products</h1>
          <p className="text-sm text-muted-foreground">
            Products expiring in the next 30 days
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
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
                  Days Remaining
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expiringProducts.map((product) => {
                const expDate = new Date(product.expDate);
                const today = new Date();
                const timeDiff = expDate.getTime() - today.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

                return (
                  <tr
                    key={product.id}
                    className={daysRemaining <= 7 ? "bg-red-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={
                          daysRemaining <= 7 ? "text-red-600 font-bold" : ""
                        }
                      >
                        {daysRemaining} days
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
