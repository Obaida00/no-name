"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductRowProps {
  product: {
    id: string;
    name: string;
    // status: "Active" | "Inactive";
    quantity:number,
    category:string,
    price: string;
    // totalSales: number;
    expDate:string,
    createdAt: string,
    updateAt:string;
  };
  onDelete: (id: string) => void;

}

export function ProductRow({ product ,onDelete}: ProductRowProps) {
    const router = useRouter();

  return (
    <TableRow>
      <TableCell className="font-medium"><Link href={`/products/${product.id}`} className="hover:underline">
      {product.name}
    </Link></TableCell>
      {/* <TableCell>
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {product.status}
        </span>
      </TableCell> */}
       <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
    product.quantity >= 50 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }`}>
    {product.quantity}
  </span>
                </TableCell>
      <TableCell>{product.category}</TableCell>

      <TableCell>{product.price}</TableCell>
      {/* <TableCell>{product.totalSales}</TableCell> */}
      <TableCell>{product.expDate}</TableCell>

      <TableCell>{product.createdAt}</TableCell>
      <TableCell>{product.updateAt}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2"   onClick={() => router.push(`/products/${product.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-500" onClick={() => onDelete(product.id)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

 // <TableRow key={product.name}>
                //   <TableCell className="font-medium">{product.name}</TableCell>
                //   <TableCell>
                //     <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                //       {product.status}
                //     </span>
                //   </TableCell>
                //   <TableCell>{product.price}</TableCell>
                //   <TableCell>{product.totalSales}</TableCell>
                //   <TableCell>{product.createdAt}</TableCell>
                //   <TableCell>
                //     <div className="flex space-x-2">
                //       <DropdownMenu>
                //         <DropdownMenuTrigger asChild>
                //           <Button variant="ghost" size="icon">
                //             <Ellipsis className="h-4 w-4 text-black-500" />
                //           </Button>
                //         </DropdownMenuTrigger>
                //         <DropdownMenuContent>
                //           <DropdownMenuItem>
                //             <Button
                //               variant="ghost"
                //               //   size="icon"
                //               onClick={() => handleEdit(product.id)}
                //             >
                //               Edit
                //               <Pencil className="h-4 w-4" />
                //             </Button>
                //           </DropdownMenuItem>
                //           <DropdownMenuItem>
                //             <Button
                //               variant="ghost"
                //               //   size="icon"
                //               onClick={() => handleDelete(product.id)}
                //             >
                //               Delete
                //               <Trash2 className="h-4 w-4 text-red-500" />
                //             </Button>
                //           </DropdownMenuItem>
                //         </DropdownMenuContent>
                //       </DropdownMenu>
                //     </div>
                //   </TableCell>
                // </TableRow>