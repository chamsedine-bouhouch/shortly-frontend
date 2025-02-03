import { NextResponse } from "next/server"

export async function GET() {
  // Here you would fetch the actual URLs from your database
  // For this example, we'll just return mock data
  const urls = [
    { id: 1, shortCode: "abc123", originalUrl: "https://example.com" },
    { id: 2, shortCode: "def456", originalUrl: "https://another-example.com" },
  ]

  return NextResponse.json(urls)
}

