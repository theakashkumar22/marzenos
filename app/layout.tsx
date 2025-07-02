import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marzenos - Coming Soon",
  description: "Experience the essence of ancient Rome through our luxurious fragrance collection. Discover Marzenos, the flagship fragrance brand inspired by Roman elegance and crafted for modern sophistication.",
  keywords: [
    "Marzenos",
    "Fragrance",
    "Perfume",
    "Rome",
    "Luxury",
    "Vanilla",
    "Tobacco",
    "Artisan",
    "Coming Soon",
    "Signature Scent"
  ],
  openGraph: {
    title: "Marzenos - Coming Soon",
    description: "Experience the essence of ancient Rome through our luxurious fragrance collection.",
    url: "https://yourdomain.com",
    siteName: "Marzenos",
    images: [
      {
        url: "/marzenos-brand.svg",
        width: 400,
        height: 400,
        alt: "Marzenos Logo",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/marzenos-brand.svg",
  },
  themeColor: "#c4996b",
  authors: [{ name: "Marzenos" }],
  creator: "Marzenos",
  robots: "index, follow",
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
