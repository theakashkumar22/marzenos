import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marzenos - Coming Soon",
  description: "Experience the essence of ancient Rome through our luxurious fragrance collection.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "serif" }}>{children}</body>
    </html>
  )
}
