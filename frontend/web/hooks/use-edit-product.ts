import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductDetails } from './use-product-details';
import { toast } from 'sonner';
import { useCategories } from '@/context/category-context';

interface ProductFormData {
  id: string;
  name: string;
  description: string;
  activeIngredient: string;
  shape: string;
  expDate: string;
  categoryId: string;
  categoryName: string;
}

export const useEditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { categories } = useCategories();

  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    name: "",
    description: "",
    activeIngredient: "",
    shape: "",
    expDate: "",
    categoryId: "",
    categoryName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { product, loading: productLoading, error: productError } = useProductDetails(id);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        description: product.description || "",
        activeIngredient: product.activeIngredient || "",
        shape: product.shape || "",
        expDate: product.expDate ? product.expDate.split("T")[0] : "",
        categoryId: product.categoryId || product.category?.id || "",
        categoryName: product.categoryName || product.category?.name || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'categoryId') {
      const selectedCategory = categories.find(cat => cat.id === value);
      setFormData(prev => ({
        ...prev,
        categoryId: value,
        categoryName: selectedCategory ? selectedCategory.name : ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const updateProduct = async (formData: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.name || !formData.categoryId) {
        toast.error("Please fill all required fields");
        return;
      }

      

      const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
      if (!selectedCategory) {
        throw new Error("Selected category not found");
      }

      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('activeIngredient', formData.activeIngredient);
      formDataToSend.append('shape', formData.shape);
      formDataToSend.append('expDate', formData.expDate);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('categoryName', selectedCategory.name);
      formDataToSend.append('_method', 'PUT');

      console.log('--- Sending Product Update ---');
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(`/api/products/${formData.id}`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      
      router.push(`/products/${formData.id}`);
      router.refresh();

      return result;
    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      const result = await response.json();
      router.push('/products');
      router.refresh();
      return result;
    } catch (err) {
      console.error('Delete error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    formData,
    handleChange,
    updateProduct,
    deleteProduct,
    categories,
    loading: productLoading || loading,
    error: productError || error,
    product
  };
};