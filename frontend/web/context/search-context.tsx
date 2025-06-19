"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  handleClear: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        isSearching,
        handleClear,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};