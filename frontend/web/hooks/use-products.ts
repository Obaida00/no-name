


// import { useState, useEffect } from 'react';

// interface Product {
//   id: string;
//   name: string;
//   description?: string;
//   activeIngredient?: string;
//   expDate?: string;
//   categoryId?: string;
// }

// interface UseProductsResult {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
//   isEmpty: boolean;
//   deleteProduct: (id: string) => Promise<void>;
// }

// export const useProducts = (): UseProductsResult => {
//   const [state, setState] = useState({
//     products: [] as Product[],
//     loading: true,
//     error: null as string | null,
//   });

//   const fetchProducts = async () => {
//     try {
//       setState(prev => ({ ...prev, loading: true, error: null }));
//       const response = await fetch('/api/products', {
//          method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Accept-Language': 'en',
//         //  'Content-Type': 'application/json',
//         //  'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQ4NTQ4NTU4LCJleHAiOjE3NDg1NTIxNTgsIm5iZiI6MTc0ODU0ODU1OCwianRpIjoiWHBzb3lnakZueG5oUUJWVSIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.IIgnZrbI1hp6aTgdkGRvPbhSQJXMacGFIXcoV7K78F4`,
//       }
//       ,  
     
//     }
// );
//       const data = await response.json();
      
//       if (!response.ok) throw new Error(data.error || `HTTP error! status: ${response.status}`);

//       setState({
//         products: Array.isArray(data) ? data : data.data || [],
//         loading: false,
//         error: null,
//       });
//     } catch (err) {
//       setState({
//         products: [],
//         loading: false,
//         error: err instanceof Error ? err.message : 'Unknown error',
//       });
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: 'DELETE',
//       });
      
//       if (!response.ok) throw new Error('Delete failed');
      
//       setState(prev => ({
//         ...prev,
//         products: prev.products.filter(p => p.id !== id),
//       }));
//     } catch (err) {
//       console.error('Delete error:', err);
//       throw err;
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   return {
//     ...state,
//     refetch: fetchProducts,
//     isEmpty: !state.loading && state.products.length === 0,
//     deleteProduct,
//   };
// };








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
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isEmpty: boolean;
}

export const useProducts = (): UseProductsResult => {
  const [state, setState] = useState<{
    products: Product[];
    loading: boolean;
    error: string | null;
  }>({
    products: [],
    loading: true,
    error: null,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch('/api/products', {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Failed to fetch products (Status: ${response.status})`
        );
      }

      const data = await response.json();
      
      const productsData = Array.isArray(data.data) ? data.data : 
                         Array.isArray(data) ? data : [];

      setState({
        products: productsData,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      setState({
        products: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load products',
      });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    ...state,
    refetch: fetchProducts,
    isEmpty: !state.loading && state.products.length === 0,
  };
};



