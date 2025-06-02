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

