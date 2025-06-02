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

import { ProductsPagination } from "./products-pagination";
import { ProductRow } from "./product-row";
import { ProductsFilters } from "./products-filters";
import { ProdutcsNavbar } from "./products-navbar";
import { useProducts } from "@/hooks/use-products";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { toast } from "sonner";

export function ProductsTable() {
  const [activeTab, setActiveTab] = useState("all");
  const { products, loading, error, refetch, isEmpty } = useProducts();

  
  const handlePrev = () => {
    /* ... */
  };
  const handleNext = () => {
    /* ... */
  };
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

  if (isEmpty) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        <p>No products found.</p>
        <button 
          onClick={refetch}
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
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
          <ProductsPagination onPrev={handlePrev} onNext={handleNext} />
        </CardFooter>
      </Card>
    </>
  );
}
