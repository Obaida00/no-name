"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

interface ProductsFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProductsFilters({ activeTab, setActiveTab }: ProductsFiltersProps) {
  return (

    // Filters and Actions
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex space-x-2">
        {["all", "active", "draft", "archived"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>
      
      <Link href="/products/add">
        <Button>
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </Link>
    </div>
  );
}

