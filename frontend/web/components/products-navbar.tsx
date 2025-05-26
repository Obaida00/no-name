"use client";

import { ChevronRight, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export function ProdutcsNavbar() {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary font-medium">All Products</span>
      </div>

      {/* Search and Profile */}
      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-64" />
        <Button
          variant="ghost"
          size="icon"
          className="border border-input rounded-md"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
