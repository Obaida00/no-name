// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface ProductFormData {
//   id: string;
//   name: string;
//   description: string;
//   activeIngredient: string;
//   shape: string;
//   expDate: string;
//   categoryId: string;
// }

// export const useEditProduct = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const updateProduct = async (formData: ProductFormData) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const formDataToSend = new FormData();
//       formDataToSend.append('id', formData.id);
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('activeIngredient', formData.activeIngredient);
//       formDataToSend.append('shape', formData.shape);
//       formDataToSend.append('expDate', formData.expDate);
//       formDataToSend.append('category_id', formData.categoryId);
//       formDataToSend.append('_method', 'PUT'); 

//       const response = await fetch(`/api/products/${formData.id}`, {
//         method: 'POST',
//         body: formDataToSend
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update product');
//       }

//       return await response.json();
//     } catch (err) {
//       console.error('Error updating product:', err);
//       setError(err instanceof Error ? err.message : 'Failed to update product');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, updateProduct };
// };











import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductDetails } from './use-product-details';
import { useCategories } from './use-categories';
import { toast } from 'sonner';

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
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    name: "",
    description: "",
    activeIngredient: "",
    shape: "",
    expDate: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { product, loading: productLoading, error: productError } = useProductDetails(id);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        description: product.description || "",
        activeIngredient: product.activeIngredient || "",
        shape: product.shape || "",
        expDate: product.expDate ? product.expDate.split("T")[0] : "",
        categoryId: product.categoryId || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProduct = async (formData: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.name || !formData.categoryId) {
        toast.error("Please fill all required fields");
        return;
      }

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

      const result = await response.json();
      toast.success("Product updated successfully");
      router.push(`/products/${id}`);
      return result;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Failed to update product');
      toast.error("Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    formData,
    handleChange,
    updateProduct,
    categories,
    loading: productLoading || categoriesLoading || loading,
    error: productError || categoriesError || error,
    product
  };
};


