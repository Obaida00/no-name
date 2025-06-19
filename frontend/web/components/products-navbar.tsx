"use client";

import {
  ChevronRight,
  User,
  Search,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSearch } from "@/context/search-context";

export function ProdutcsNavbar() {
  const { searchTerm, setSearchTerm, isSearching, handleClear } = useSearch();

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
        <Link href="/products/expiring-soon">
          <Button variant="destructive">Expiring Soon</Button>
        </Link>
        <Link href="/products/expired">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Expired Products
          </Button>
        </Link>
        <div className="relative">
          <Input
            placeholder="Search products..."
            className="w-64 pl-10 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          {/* Clear Icon */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

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
