"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { toast } from "sonner";

interface ProductRowProps {
  product: {
    id: string; 
    name: string;
    createdAt: string;
    updatedAt: string;

    shape: string;
    description?: string;
    activeIngredient?: string;
    expDate?: string;
    categoryId?: string;
  };
  onDelete: (id: string) => void;
}

export function ProductRow({ product, onDelete }: ProductRowProps) {
  const router = useRouter();
const [isDeleting, setIsDeleting] = useState(false);
  const { deleteProduct } = useDeleteProduct();
 const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      try {
        await deleteProduct(product.id);
        onDelete(product.id); 
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/products/${product.id}`} className="hover:underline">
          {product.name}
        </Link>
      </TableCell>

      <TableCell>{product.shape}</TableCell>

      <TableCell>{product.activeIngredient}</TableCell>
      <TableCell>
        {product.expDate
          ? new Date(product.expDate).toLocaleDateString()
          : "N/A"}
      </TableCell>
      <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(product.updatedAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => router.push(`/products/${product.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-500"
onClick={handleDelete}
              disabled={isDeleting}            >
              <Trash2 className="h-4 w-4" />
                            {isDeleting ? 'Deleting...' : 'Delete'}

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
