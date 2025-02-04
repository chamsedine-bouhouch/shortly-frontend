"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "../config/api";

interface UrlItemProps {
  url: {
    id: string;
    shortCode: string;
    originalUrl: string;
  };
}

async function deleteUrl(shortCode: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/url-shortener/${shortCode}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete URL");
  }
}

export default function UrlItem({ url }: UrlItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, void>({
    mutationFn: () => deleteUrl(url.shortCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast({
        title: "URL deleted successfully",
        description: "The shortened URL has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete URL. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
      <div>
        <a
          href={`${API_BASE_URL}/url-shortener/${url.shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {`${API_BASE_URL}/url-shortener/${url.shortCode}`}
        </a>
        <p className="text-sm text-gray-500 truncate">{url.originalUrl}</p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
