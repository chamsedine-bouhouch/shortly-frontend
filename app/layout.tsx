"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type React from "react";
import { toast } from "@/components/ui/use-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      },
    },
    mutations: {
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
