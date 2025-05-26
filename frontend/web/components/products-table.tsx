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

export function ProductsTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Smartphone X Pro",
      status: "Active",
      quantity:100,
      category:"phone",
      price: "$999.00",
    //   totalSales: 150,
    expDate: "6/23/2024",

      createdAt: "6/23/2024",
      updateAt: "6/23/2024",

    },
    {
      id: "2",
      name: "Wireless Earbuds Ultra",
      status: "Inactive",
      quantity:100,

      price: "$199.00",
      totalSales: 300,
      createdAt: "6/23/2024",
    },
    {
      id: "3",
      name: "Smart Home Hub",
      status: "Active",
      quantity:200,

      price: "$149.00",
      totalSales: 200,
      createdAt: "6/23/2024",
    },
    {
      id: "4",
      name: "4K Ultra HD Smart TV",
      status: "Active",
      quantity:50,

      price: "$799.00",
      totalSales: 50,
      createdAt: "6/23/2024",
    },
    {
      id: "5",
      name: "Gaming Laptop Pro",
      status: "Active",
      quantity:20,

      price: "$1299.00",
      totalSales: 75,
      createdAt: "6/23/2024",
    },
    // {
    //     id: "6",
    //     name: "Smartphone X Pro",
    //     status: "Active",
    //     price: "$999.00",
    //     totalSales: 150,
    //     createdAt: "6/23/2024",
    //   },
    //   {
    //     id: "7",
    //     name: "Smartphone X Pro",
    //     status: "Active",
    //     price: "$999.00",
    //     totalSales: 150,
    //     createdAt: "6/23/2024",
    //   },
    //   {
    //     id: "8",
    //     name: "Smartphone X Pro",
    //     status: "Active",
    //     price: "$999.00",
    //     totalSales: 150,
    //     createdAt: "6/23/2024",
    //   },
    //   {
    //     id: "9",
    //     name: "Smartphone X Pro",
    //     status: "Active",
    //     price: "$999.00",
    //     totalSales: 150,
    //     createdAt: "6/23/2024",
    //   },
  ]);
  const handlePrev = () => {
    /* ... */
  };
  const handleNext = () => {
    /* ... */
  };
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
      // هنا يمكنك إضافة طلب API لحذف المنتج من الخادم
    }
  };

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
                //   "Status",
                "Quantity",
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
{
  /* <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </TableBody>
          </Table>
        </CardContent> */
}
