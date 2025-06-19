"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar, { AppSidebarTrigger } from "@/components/app-sidebar";
import { ProductProvider } from "@/context/ProductContext";
import { SearchProvider } from "@/context/search-context";
import { CategoryProvider } from "@/context/category-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider>
        <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} `}
        >
          {/* <AppSidebar></AppSidebar>
          <AppSidebarTrigger></AppSidebarTrigger> */}
          <ProductProvider>
          <CategoryProvider>
            <SearchProvider>
               <AppSidebar></AppSidebar>
          <AppSidebarTrigger></AppSidebarTrigger>
              {children}
                      <Toaster richColors position="top-right" />

            </SearchProvider>
          </CategoryProvider>
        </ProductProvider>
        </body>
      </html>
      </SidebarProvider>
  );
}
