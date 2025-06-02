import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ProductFormData {
  name: string;
  description: string;
  activeIngredient: string;
  shape: string;
  expDate: string;
  categoryId: string;
}

interface UseAddProductResult {
  loading: boolean;
  error: string | null;
  addProduct: (formData: ProductFormData) => Promise<void>;
}

export const useAddProduct = (): UseAddProductResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const addProduct = async (formData: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('activeIngredient', formData.activeIngredient);
      formDataToSend.append('shape', formData.shape);
      formDataToSend.append('expDate', formData.expDate);
      formDataToSend.append('categoryId', formData.categoryId);

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      toast.success('Product added successfully');
      router.push('/products');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
      toast.error(err instanceof Error ? err.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addProduct };
};