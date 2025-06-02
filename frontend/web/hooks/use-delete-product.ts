import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UseDeleteProductResult {
  loading: boolean;
  error: string | null;
  deleteProduct: (id: string) => Promise<void>;
}

export const useDeleteProduct = (): UseDeleteProductResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      toast.success('Product deleted successfully');
      router.push('/products'); 
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteProduct };
};