import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormData {
  id: string;
  name: string;
  description: string;
  activeIngredient: string;
  shape: string;
  expDate: string;
  categoryId: string;
}

export const useEditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const updateProduct = async (formData: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('activeIngredient', formData.activeIngredient);
      formDataToSend.append('shape', formData.shape);
      formDataToSend.append('expDate', formData.expDate);
      formDataToSend.append('category_id', formData.categoryId);
      formDataToSend.append('_method', 'PUT'); 

      const response = await fetch(`/api/products/${formData.id}`, {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      return await response.json();
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateProduct };
};