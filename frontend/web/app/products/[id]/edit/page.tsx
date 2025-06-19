




"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditProduct } from "@/hooks/use-edit-product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProductPage() {
  const {
    formData,
    handleChange,
    updateProduct,
    categories,
    loading,
    error,
    product,
  } = useEditProduct();
  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const updatedProduct = await updateProduct(formData);
    console.log("Updated category data:", {
      sent: {
        category_id: formData.categoryId,
        category_name: formData.categoryName
      },
      received: {
        categoryId: updatedProduct.data.categoryId,
        categoryName: updatedProduct.data.categoryName,
        category: updatedProduct.data.category
      }
    });
     toast.success('Product updated successfully')
    router.push(`/products/${formData.id}`);
    router.refresh();
  } catch (error) {
        toast.error('Failed to update product')

    console.error("Update error:", error);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label>Product image</Label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="activeIngredient">Active Ingredient</Label>
            <Input
              id="activeIngredient"
              name="activeIngredient"
              value={formData.activeIngredient}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="shape">Shape</Label>
            <Input
              id="shape"
              name="shape"
              value={formData.shape}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="expDate">Expiration Date</Label>
            <Input
              id="expDate"
              name="expDate"
              type="date"
              value={formData.expDate}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="categoryId">Category *</Label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/products/${product.id}`)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}


















