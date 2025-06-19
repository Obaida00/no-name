"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<{
    categories: Category[];
    loading: boolean;
    error: string | null;
  }>({
    categories: [],
    loading: true,
    error: null,
  });

  const fetchCategories = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const res = await fetch('/api/categories');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      const categoriesData = Array.isArray(data) ? data : 
                           (Array.isArray(data.data) ? data.data : []);

      setState({
        categories: categoriesData,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Failed to load categories:', err);
      setState({
        categories: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load categories',
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = async () => {
    await fetchCategories();
  };


const updateProduct = async (id: string, formData: FormData): Promise<void> => {
  try {
    formData.append('_method', 'PUT');
    
    const response = await fetch(`/api/products/${id}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update product');
    }

    await refetch(); 
    toast.success('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    toast.error('Failed to update product');
    throw error;
  }
};
  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        loading: state.loading,
        error: state.error,
        refetch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};