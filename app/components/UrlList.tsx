"use client"

import { useQuery } from "@tanstack/react-query"
import UrlItem from "./UrlItem"
import { API_BASE_URL } from "../config/api"

async function fetchUrls() {
  const response = await fetch(`${API_BASE_URL}/url-shortener`)
  if (!response.ok) {
    throw new Error("Failed to fetch URLs")
  }
  return response.json()
}

export default function UrlList() {
  const {
    data: urls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: fetchUrls,
  })

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error fetching URLs</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Shortened URLs</h2>
      {urls && urls.length > 0 ? (
        urls.map((url: any) => <UrlItem key={url.id} url={url} />)
      ) : (
        <div className="text-center text-gray-500">No shortened URLs yet</div>
      )}
    </div>
  )
}

