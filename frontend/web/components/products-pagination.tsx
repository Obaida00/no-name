"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";


interface ProductsPaginationProps {
  onPrev: () => void;
  onNext: () => void;
}

export function ProductsPagination(
    {
    offset,
    totalProducts
  }: {
    // products: SelectProduct[];
    offset: number;
    totalProducts: number;}
) {
        let router = useRouter();
        let productsPerPage = 5;
      
        function prevPage() {
          router.back();
        }
      
        function nextPage() {
          router.push(`/?offset=${offset}`);
        }
    
  return (
    <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
  );
}

{/* <form className="flex items-center w-full justify-end">
<div className="flex ">
  <Button
    formAction={prevPage}
    variant="ghost"
    size="sm"
    type="submit"
    //   disabled={offset === productsPerPage}
  >
    <ChevronLeft className="mr-2 h-4 w-4" />
    Prev
  </Button>
  <Button
    formAction={nextPage}
    variant="ghost"
    size="sm"
    type="submit"
    //   disabled={offset + productsPerPage > totalProducts}
  >
    Next
    <ChevronRight className="ml-2 h-4 w-4" />
  </Button>
</div>
</form> */}