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
import { toast } from "sonner";
import { useProducts } from "@/context/ProductContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    categoryName?: string;
    category?: {
      id: string;
      name: string;
    };
  };
  onDelete: (id: string) => Promise<void>;
}

export function ProductRow({ product, onDelete }: ProductRowProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(product.id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </TableCell>

        <TableCell>{product.categoryName || product.category?.name}</TableCell>

        <TableCell>
          {product.expDate
            ? new Date(product.expDate).toLocaleDateString()
            : "N/A"}
        </TableCell>
        <TableCell>
          {new Date(product.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          {new Date(product.updatedAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isDeleting}>
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
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{product.name}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
