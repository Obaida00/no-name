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
    <form className="flex items-center w-full justify-between">
      <div className="text-xs text-muted-foreground">
        Showing <strong>{from} </strong> - <strong>{to}</strong> out of{" "}
        <strong>{totalItems}</strong>{" "}
        {/* ..<strong>{currentPage}</strong>{" "} */}
        {/* <strong>{from}</strong>  <strong>{to}</strong> <strong>{totalItems}</strong>  */}
        products
        {/* {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })} */}
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
