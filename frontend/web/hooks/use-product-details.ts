
import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  description?: string;
  activeIngredient?: string;
  shape?: string;
  expDate?: string;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}

interface UseProductDetailsResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProductDetails = (id: string | undefined): UseProductDetailsResult => {
  const [state, setState] = useState<{
    product: Product | null;
    loading: boolean;
    error: string | null;
  }>({
    product: null,
    loading: !!id, 
    error: null,
  });

  const fetchProduct = useCallback(async () => {
    try {
      if (!id) {
        throw new Error('Product ID is required');
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(`/api/products/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 
          (response.status === 404 
            ? 'Product not found' 
            : 'Failed to fetch product data');
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const productData = data.data || data;

      if (!productData?.id) {
        throw new Error('The product data format is invalid');
      }

      setState({
        product: productData,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error fetching the product', err);
      setState({
        product: null,
        loading: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  return {
    ...state,
    refetch: fetchProduct,
  };
};