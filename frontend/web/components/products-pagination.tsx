import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PaginationControls = ({
  currentPage,
  totalPages,
  from,
  to,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  from: number;
  to: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    // <div className="flex items-center justify-between mt-4">
    //   <div className="flex gap-1">
    //     <Button
    //       variant="outline"
    //       disabled={currentPage <= 1}
    //       onClick={() => onPageChange(currentPage - 1)}
    //     >
    //       
    //     </Button>

    //     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    //       const page = i + 1;
    //       return (
    //         <Button
    //           key={page}
    //           variant={currentPage === page ? "default" : "outline"}
    //           onClick={() => onPageChange(page)}
    //         >
    //           {page}
    //         </Button>
    //       );
    //     })}

    //     {totalPages > 5 && (
    //       <span className="px-3 py-1">...</span>
    //     )}

    //     <Button
    //       variant="outline"
    //       disabled={currentPage >= totalPages}
    //       onClick={() => onPageChange(currentPage + 1)}
    //     >
    //       
    //     </Button>
    //   </div>

    //   <div className="text-sm text-muted-foreground">
    //      {currentPage}  {totalPages}
    //   </div>
    // </div>
    <form className="flex items-center w-full justify-between">
      <div className="text-xs text-muted-foreground">
        Showing <strong>{from} </strong> - <strong>{to}</strong> out of{" "}
        <strong>{totalItems}</strong>{" "} 
        {/* ..<strong>{currentPage}</strong>{" "} */}
        {/* <strong>{from}</strong>  <strong>{to}</strong> <strong>{totalItems}</strong>  */}
        products
      </div>
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};












