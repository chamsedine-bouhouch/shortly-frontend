"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

async function deleteUrl(shortCode: string) {
  const response = await fetch(`/api/${shortCode}`, { method: "DELETE" })
  if (!response.ok) {
    throw new Error("Failed to delete URL")
  }
}

export default function UrlItem({ url }: { url: any }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => deleteUrl(url.shortCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] })
      toast({
        title: "URL deleted successfully",
        description: "The shortened URL has been removed.",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete URL. Please try again.",
        variant: "destructive",
      })
    },
  })

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
      <div>
        <a
          href={`/${url.shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {`${typeof window !== "undefined" ? window.location.origin : ""}/${url.shortCode}`}
        </a>
        <p className="text-sm text-gray-500 truncate">{url.originalUrl}</p>
      </div>
      <Button variant="destructive" size="sm" onClick={() => mutation.mutate()} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  )
}

