  "use client";

  import { useState } from "react";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { toast } from "@/components/ui/use-toast";
  import { API_BASE_URL } from "../config/api";

  async function shortenUrl(url: string) {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }
    return response.json();
  }

  export default function UrlShortenerForm() {
    const [url, setUrl] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: (url: string) => shortenUrl(url),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["urls"] });
        setUrl("");
        toast({
          title: "URL shortened successfully",
          description: "Your shortened URL has been created.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to shorten URL. Please try again.",
          variant: "destructive",
        });
      },
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      mutation.mutate(url);
    };

    return (
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            required
            className="flex-grow"
          />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Shortening..." : "Shorten"}
          </Button>
        </div>
      </form>
    );
  }
