"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import { useAddProduct } from "@/hooks/use-add-product";
import { useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { loading, error, addProduct } = useAddProduct();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    activeIngredient: "",
    shape: "",
    expDate: "",
    categoryId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(product);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>Error loading categories: {categoriesError}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* قسم صور المنتج */}
        <div>
          <Label htmlFor="images" className="block mb-4">
            Product Images
          </Label>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-32"
              >
                {/* {product.images[index] ? (
                  <img 
                    src={URL.createObjectURL(product.images[index])} 
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, index)}
                      accept="image/*"
                    />
                  </label>
                )} */}
              </div>
            ))}
          </div>
        </div>
        {/* قسم اسم المنتج */}
        <div>
          <Label htmlFor="name" className="block mb-2">
            Product Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* قسم وصف المنتج */}
        <div>
          <Label htmlFor="description" className="block mb-2">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* المكونات النشطة */}
          <div>
            <Label htmlFor="activeIngredient" className="block mb-2">
              Active Ingredient
            </Label>
            <Input
              id="activeIngredient"
              name="activeIngredient"
              placeholder="Enter active ingredient"
              value={product.activeIngredient}
              onChange={handleChange}
              required
            />
          </div>

          {/* الشكل */}
          <div>
            <Label htmlFor="shape" className="block mb-2">
              Shape
            </Label>
            <Input
              id="shape"
              name="shape"
              placeholder="Enter product shape"
              value={product.shape}
              onChange={handleChange}
              required
            />
          </div>

          {/* تاريخ الانتهاء */}
          <div>
            <Label htmlFor="expDate" className="block mb-2">
              Expiration Date
            </Label>
            <Input
              id="expDate"
              name="expDate"
              type="date"
              value={product.expDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* الفئة */}
          <div>
            <Label htmlFor="categoryId" className="block mb-2">
              Category *
            </Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              id="categoryId"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
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

        {/* أزرار الإرسال */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/products")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
