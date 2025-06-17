import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";

export const useExpiringProducts = () => {
  const { products, loading, error } = useProducts();
  const [expiringProducts, setExpiringProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const soonToExpire = products.filter((product) => {
        if (!product.expDate) return false;

        const expDate = new Date(product.expDate);
        const today = new Date();
        const timeDiff = expDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return daysDiff <= 30 && daysDiff >= 0;
      });

      setExpiringProducts(soonToExpire);
    }
  }, [products]);

  return {
    expiringProducts,
    loading,
    error,
  };
};