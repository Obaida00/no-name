import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";

export const useExpiredProducts = () => {
  const { products, loading, error, refetch } = useProducts();
  const [expiredProducts, setExpiredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const today = new Date();
      const expired = products.filter((product) => {
        if (!product.expDate) return false;
        const expDate = new Date(product.expDate);
        return expDate < today;
      });
      setExpiredProducts(expired);
    }
  }, [products]);

  return {
    expiredProducts,
    loading,
    error,
    refetch,
  };
};