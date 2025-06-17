// البحث دون استحدام البحث اثناء الكتابة 


// "use client";

// import { ChevronRight, User, Search, X, AlertTriangle } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export function ProdutcsNavbar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     if (searchTerm) params.set('search', searchTerm);
//     router.push(`/products?${params.toString()}`);
//   };

  
//   const handleClear = () => {
//     setSearchTerm('');
//     router.push('/products');
//   };

//   return (
//     <div className="flex items-center justify-between w-full mb-6">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm text-muted-foreground">
//         <Link href="/dashboard" className="hover:text-primary">
//           Dashboard
//         </Link>
//         <ChevronRight className="mx-2 h-4 w-4" />
//         <Link href="/products" className="hover:text-primary">
//           Products
//         </Link>
//         <ChevronRight className="mx-2 h-4 w-4" />
//         <span className="text-primary font-medium">All Products</span>
//       </div>

//       <Link href="/products/expiring-soon">
//         <Button variant="destructive">Expiring Soon</Button>
//       </Link>
//       <Link href="/products/expired">
//   <Button variant="outline">
//     <AlertTriangle className="mr-2 h-4 w-4" />
//     Expired Products
//   </Button>
// </Link>

//       {/* Search and Profile */}
//       {/* <div className="flex items-center gap-4">
//         <form onSubmit={handleSearch}>
//           <Input
//             placeholder="Search..."
//             className="w-64"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               if (!e.target.value) {
//                 router.push('/products');
//               }
//             }}
//           />
//         </form>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="border border-input rounded-md"
//         >
//           <User className="h-4 w-4" />
//         </Button>
//       </div> */}
//          <div className="flex items-center gap-4">
//         <form onSubmit={handleSearch} className="relative">
//           <div className="relative">
//             <Input
//               placeholder="Search products..."
//               className="w-64 pl-10 pr-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {/* Search Icon */}
//             <Search 
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
//             />
//             {/* Clear Icon (only visible when there's text) */}
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={handleClear}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           {/* Hidden submit button for form submission on Enter */}
//           <button type="submit" className="hidden" />
//         </form>
        
//         <Button
//           variant="ghost"
//           size="icon"
//           className="border border-input rounded-md"
//           onClick={handleSearch}
//         >
//           <Search className="h-4 w-4" />
//         </Button>
        
//         <Button
//           variant="ghost"
//           size="icon"
//           className="border border-input rounded-md"
//         >
//           <User className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }
















"use client";

import { ChevronRight, User, Search, X, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSearch } from "@/hooks/use-search";

export function ProdutcsNavbar() {
  const {
    searchTerm,
    setSearchTerm,
    isSearching,
    handleClear
  } = useSearch();

  return (
    <div className="flex items-center justify-between w-full mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary font-medium">All Products</span>
      </div>

      <Link href="/products/expiring-soon">
        <Button variant="destructive">Expiring Soon</Button>
      </Link>
             <Link href="/products/expired">
  <Button variant="outline">
     <AlertTriangle className="mr-2 h-4 w-4" />
     Expired Products
   </Button>
 </Link>

      {/* Search and Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            placeholder="Search products..."
            className="w-64 pl-10 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          {/* Clear Icon */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="border border-input rounded-md"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}