"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useState } from "react";

import { PaginationControls } from "./products-pagination";
import { ProductRow } from "./product-row";
import { ProductsFilters } from "./products-filters";
import { ProdutcsNavbar } from "./products-navbar";
import { useProducts } from "@/hooks/use-products";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductsTable() {
  const [activeTab, setActiveTab] = useState("all");
  const { products, loading, error, pagination, refetch,changePage, } = useProducts();
 const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const router = useRouter();

  
  
  // const handleDelete = (id: string) => {
  //   if (confirm("Are you sure you want to delete this product?")) {
  //     setProducts(products.filter((product) => product.id !== id));
  //   }
  // };

  // const handleDelete = async (id: string) => {
    // if (confirm("Are you sure you want to delete this product?")) {
    //   try {
    //     const response = await fetch(`/api/products/${id}`, {
    //       method: "DELETE",
    //     });
        
    //     if (!response.ok) {
    //       throw new Error("Failed to delete product");
    //     }
        
    //     setProducts(products.filter((product) => product.id !== id));
    //   } catch (err) {
    //     console.error("Error deleting product:", err);
    //     alert("Failed to delete product");
    //   }
    // }
    // await fetch(`/api/products/${id}`, { method: "DELETE" });
    // setProducts(products.filter(p => p.id !== id)); 
  // };
  const { deleteProduct } = useDeleteProduct();

 const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product permanently?')) {
      try {
        await deleteProduct(id);
        await refetch();
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
        console.error('Delete error:', error);
      }
    }
  };

  

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

  // if (isEmpty) {
  //   return (
  //     <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
  //       <p>No products found.</p>
  //       <button 
  //         onClick={refetch}
  //         className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
  //       >
  //         Refresh
  //       </button>
  //     </div>
  //   );
  // }
if (searchTerm && products.length === 0) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Search className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <h3 className="text-lg font-medium">No matching products found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Your search for "{searchTerm}" did not match any products.
            </p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or check for typos.
            </p>
          </div>
          <div className="flex gap-2 mt-6">
            <Button 
              variant="outline"
              onClick={() => router.push('/products')}
            >
              Clear search
            </Button>
            <Link href="/products/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

  
  return (
    <>
      <div className="flex flex-col space-y-4">
        <ProdutcsNavbar></ProdutcsNavbar>
        <ProductsFilters activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your products and view their sales performance.
          </p>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "Name",
                  "Category",
                  "Price",
                  "ExpDate",
                  "Created at",
                  "Update at",
                  "",
                ].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {pagination && (
        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={changePage}
           from={pagination.from}
          to={pagination.to}
          totalItems={pagination.totalItems}
        />
      )}
        </CardFooter>
      </Card>
    </>
  );
}
