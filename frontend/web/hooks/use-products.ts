
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';

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
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  from: number;
  to: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
}

export const useProducts = (initialPage = 1, initialPerPage = 15) => {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
    pagination: null,
  });

  const currentPageRef = useRef(initialPage);
  const perPageRef = useRef(initialPerPage);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const fetchProducts = useCallback(async (page: number, itemsPerPage: number = perPageRef.current) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

       let url = `/api/products?page=${page}&per_page=${itemsPerPage}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json();
      
      const productsData = responseData.data || responseData || [];
      const meta = responseData.meta || responseData;

      const paginationData: PaginationInfo = {
        currentPage: meta.current_page || page,
        totalPages: meta.last_page || Math.ceil((meta.total || productsData.length) / itemsPerPage) || 1,
        totalItems: meta.total || productsData.length,
        perPage: meta.per_page || itemsPerPage,
        from: meta.from || ((page - 1) * itemsPerPage) + 1,
        to: meta.to || Math.min(page * itemsPerPage, meta.total || productsData.length),
      };

      setState({
        products: productsData,
        loading: false,
        error: null,
        pagination: paginationData,
      });

      currentPageRef.current = page;
      perPageRef.current = itemsPerPage;

      return { products: productsData, pagination: paginationData };
    } catch (error) {
      const errorMessage = error instanceof Error ? 
        error.message : 
        'Failed to fetch products';
      
      setState({
        products: [],
        loading: false,
        error: errorMessage,
        pagination: null,
      });

      throw error;
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts(initialPage, initialPerPage);
  }, [fetchProducts, initialPage, initialPerPage]);

  const changePage = (page: number) => {
    if (page === currentPageRef.current) return;
    fetchProducts(page);
  };

  const changeItemsPerPage = (newPerPage: number) => {
    if (newPerPage === perPageRef.current) return;
    fetchProducts(1, newPerPage);
  };

  const nextPage = () => {
    if (!state.pagination) return;
    const { currentPage, totalPages } = state.pagination;
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!state.pagination) return;
    const { currentPage } = state.pagination;
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  };

  const refetch = () => fetchProducts(currentPageRef.current, perPageRef.current);

  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    currentPage: state.pagination?.currentPage || currentPageRef.current,
    totalPages: state.pagination?.totalPages || 1,
    refetch,
    changePage,
    changeItemsPerPage,
    nextPage,
    prevPage,
    setPerPage: changeItemsPerPage,
  };
};









