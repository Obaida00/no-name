"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    setIsSearching(true);
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    }

    const timer = setTimeout(() => {
      router.push(`/products?${params.toString()}`);
      setIsSearching(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, router]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    handleClear
  };
};