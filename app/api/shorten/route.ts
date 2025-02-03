import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { url } = await request.json()

  // Here you would implement the actual URL shortening logic
  // For this example, we'll just return a mock response
  const shortCode = Math.random().toString(36).substring(2, 8)

  return NextResponse.json({ shortCode, originalUrl: url })
}

