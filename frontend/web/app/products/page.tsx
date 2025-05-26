import { ProdutcsNavbar } from "@/components/products-navbar"
import { ProductsTable } from "@/components/products-table"

export default function ProductsPage() {
  return (
    <main className="flex w-full flex-col p-8">
      <div className="flex flex-col space-y-8">
        <ProductsTable />
      </div>
    </main>
  )
}

// import { getProducts } from "../api/product/route"
// import { ProductTable } from '@/components/products/table';

// export default async function ProductsPage() {
//   try {
//     const products = await getProducts();
//     return <ProductTable products={products} />;
//   } catch (error) {
//     return (
//       <div className="p-4 text-red-500">
//         Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
//       </div>
//     );
//   }
// }