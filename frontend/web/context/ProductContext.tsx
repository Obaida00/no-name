"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

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
  categoryName?: string;
  category?: {
    id: string;
    name: string;
  };
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  from: number;
  to: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  currentPage: number;
  totalPages: number;
  refetch: () => Promise<void>;
  changePage: (page: number) => void;
  changeItemsPerPage: (newPerPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<{
    products: Product[];
    loading: boolean;
    error: string | null;
    pagination: PaginationInfo | null;
  }>({
    products: [],
    loading: true,
    error: null,
    pagination: null,
  });

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const fetchProducts = useCallback(
    async (page: number, itemsPerPage: number = 15): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

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
          totalPages:
            meta.last_page ||
            Math.ceil((meta.total || productsData.length) / itemsPerPage) ||
            1,
          totalItems: meta.total || productsData.length,
          perPage: meta.per_page || itemsPerPage,
          from: meta.from || (page - 1) * itemsPerPage + 1,
          to:
            meta.to ||
            Math.min(page * itemsPerPage, meta.total || productsData.length),
        };

        setState({
          products: productsData,
          loading: false,
          error: null,
          pagination: paginationData,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch products";

        setState({
          products: [],
          loading: false,
          error: errorMessage,
          pagination: null,
        });

        throw error;
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const changePage = (page: number) => {
    if (page === state.pagination?.currentPage) return;
    fetchProducts(page);
  };

  const changeItemsPerPage = (newPerPage: number) => {
    if (newPerPage === state.pagination?.perPage) return;
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

  const refetch = useCallback(async (): Promise<void> => {
    try {
      await fetchProducts(state.pagination?.currentPage || 1);
    } catch (error) {
      console.error("Error refetching products:", error);
      throw error;
    }
  }, [fetchProducts, state.pagination?.currentPage]);

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      await refetch();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
      throw error;
    }
  };

  const addProduct = async (formData: FormData): Promise<void> => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      await refetch();
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
      throw error;
    }
  };

  const updateProduct = async (
    id: string,
    formData: FormData
  ): Promise<void> => {
    try {
      if (!id || !formData) {
        throw new Error("Product ID and form data are required");
      }

      formData.append("_method", "PUT");

      console.log("Updating product with data:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(`/api/products/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
        cache: "no-store",
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: "Failed to parse error response" };
        }

        const errorMessage =
          errorData.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Update successful:", responseData);

      await refetch();

      toast.success("Product updated successfully", {
        description: `Product "${responseData.data?.name || id}" was updated`,
        // action: {
        //   label: 'View',
        //   onClick: () => router.push(`/products/${id}`),
        // },
      });
    } catch (error) {
      console.error("Error in updateProduct:", error);

      toast.error("Failed to update product", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });

      throw error;
    } finally {
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          (response.status === 404
            ? "Product not found"
            : "Failed to fetch product data");
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        pagination: state.pagination,
        currentPage: state.pagination?.currentPage || 1,
        totalPages: state.pagination?.totalPages || 1,
        refetch,
        changePage,
        changeItemsPerPage,
        nextPage,
        prevPage,
        deleteProduct,
        addProduct,
        updateProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
