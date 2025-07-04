"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react" // Add ShoppingBag icon

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showStore, setShowStore] = useState(false)

  // Show "Store" button only after launch date
  useEffect(() => {
    const launchDate = new Date("2025-08-15T12:00:00")
    if (new Date().getTime() >= launchDate.getTime()) {
      setShowStore(true)
    }
    // Optionally, update in real time:
    const timer = setInterval(() => {
      if (new Date().getTime() >= launchDate.getTime()) {
        setShowStore(true)
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    // Store as external link with icon, only if launched
    ...(showStore
      ? [{
          href: "https://shop.marzenos.com",
          label: "Store",
          external: true,
          icon: <ShoppingBag className="inline-block w-5 h-5 mr-1 -mt-1" />
        }]
      : []),
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#c4996b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-[#c4996b] font-bold text-xl tracking-wider hover:text-[#c4996b]/80 transition-colors duration-300"
          >
            MARZENOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium flex items-center transition-all duration-300 ${
                    pathname === item.href ? "text-[#c4996b]" : "text-gray-300 hover:text-[#c4996b]"
                  }`}
                  style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === item.href ? "text-[#c4996b]" : "text-gray-300 hover:text-[#c4996b]"
                  }`}
                  style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4996b] animate-pulse"></div>
                  )}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#c4996b] hover:text-[#c4996b]/80 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 rounded-lg mt-2">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2 text-base font-medium transition-all duration-300 rounded-md text-gray-300 hover:text-[#c4996b] hover:bg-[#c4996b]/5"
                    style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-all duration-300 rounded-md ${
                      pathname === item.href
                        ? "text-[#c4996b] bg-[#c4996b]/10"
                        : "text-gray-300 hover:text-[#c4996b] hover:bg-[#c4996b]/5"
                    }`}
                    style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
