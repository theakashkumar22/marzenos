"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Instagram, Facebook, Twitter, Star, Crown, Linkedin } from "lucide-react"
import Navigation from "@/components/navigation"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    const launchDate = new Date("2025-08-15T12:00:00")
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setLaunched(true)
      }
    }, 1000)

    // If already launched on first render
    if (new Date().getTime() >= launchDate.getTime()) {
      setLaunched(true)
    }

    return () => clearInterval(timer)
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        alert("Thank you for subscribing! You'll be notified when we launch.");
        setEmail("");
      } else {
        alert("There was an error. Please try again.");
      }
    } catch {
      alert("There was an error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden animate-fade-in">
      <Navigation />

      {/* Roman Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-[#c4996b] to-transparent shimmer-effect"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-[#c4996b] to-transparent shimmer-effect"></div>
        <div className="hidden md:block absolute top-0 left-0 w-8 h-full bg-gradient-to-b from-transparent via-[#c4996b] to-transparent"></div>
        <div className="hidden md:block absolute top-0 right-0 w-8 h-full bg-gradient-to-b from-transparent via-[#c4996b] to-transparent"></div>
      </div>

      {/* Roman Corner Decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c4996b] opacity-60 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo Section */}
        <div className="mb-4 text-center animate-slide-down">
          <div className="mt-20 mb-2">
            <Image
              src="/Untitled-design-1.png"
              alt="Marzenos Logo"
              width={150}
              height={150}
              className="mx-auto filter brightness-110 animate-float"
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12 max-w-4xl animate-slide-up">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#c4996b] mb-0 animate-pulse-subtle"
            style={{
              fontFamily: "Garamond, 'Times New Roman', serif",
              letterSpacing: "0.111em",
              lineHeight: "1.4",
            }}
          >
            MARZENOS
          </h1>
          <h2
            className="text-xl md:text-xl lg:text-2xl text-[#c4996b] mb-8"
            style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
          >
            ROME
          </h2>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
          >
            Experience the essence of ancient Rome through our luxurious fragrance collection. Where timeless elegance
            meets modern sophistication.
          </p>
        </div>

        {/* Only show launch-related components if NOT launched */}
        {!launched && (
          <>
            {/* Countdown Timer */}
            <div className="mb-12 animate-fade-in-delayed">
              <h3
                className="text-2xl md:text-3xl text-[#c4996b] text-center mb-8"
                style={{
                  fontFamily: "Garamond, 'Times New Roman', serif",
                  letterSpacing: "0.111em",
                  lineHeight: "1.4",
                }}
              >
                LAUNCHING SOON
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 max-w-xs sm:max-w-2xl mx-auto text-center">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#c4996b]/10 border border-[#c4996b]/30 rounded-lg p-4 md:p-6 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 hover:bg-[#c4996b]/20"
                  >
                    <div
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c4996b]/80 mb-1 sm:mb-2"
                      style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                    >
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div
                      className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wider"
                      style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Subscription */}
            <div className="mb-12 w-full max-w-md animate-slide-up-delayed">
              <h3
                className="text-xl md:text-2xl text-[#c4996b] text-center mb-6"
                style={{
                  fontFamily: "Garamond, 'Times New Roman', serif",
                  letterSpacing: "0.111em",
                  lineHeight: "1.4",
                }}
              >
                BE THE FIRST TO KNOW
              </h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c4996b] w-5 h-5 z-10 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 glass-effect text-white placeholder-gray-400 focus:border-[#c4996b] focus:ring-[#c4996b] transition-all duration-300"
                    style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#c4996b] hover:bg-[#c4996b]/90 text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#c4996b]/20"
                  style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                >
                  NOTIFY ME AT LAUNCH
                </Button>
              </form>
            </div>
          </>
        )}

        {/* Product Preview - Enhanced */}
        <div className="mb-10 text-center animate-zoom-in">
          <h3
            className="text-2xl md:text-3xl text-[#c4996b] mb-8"
            style={{
              fontFamily: "Garamond, 'Times New Roman', serif",
              letterSpacing: "0.111em",
              lineHeight: "1.4",
            }}
          >
            INTRODUCING OUR FLAGSHIP FRAGRANCE
          </h3>
          
          <div className="relative inline-block group">
            {/* Product Image Container */}
            <div className="relative">
              <Image
                src="/marzenos-tb.png"
                alt="TABACUM VANNILLA - Marzenos Signature Fragrance"
                width={300}
                height={400}
                className="mx-auto rounded-lg shadow-2xl border border-[#c4996b]/20 transition-all duration-500 hover:shadow-[#c4996b]/30 hover:scale-105 group-hover:shadow-2xl"
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c4996b]/30 via-[#d4a976]/20 to-[#c4996b]/30 rounded-lg blur opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Animated Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#c4996b]/20 to-transparent rounded-lg animate-pulse"></div>
            </div>

            {/* Product Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
              <h4
                className="text-[#c4996b] font-bold text-xl mb-2"
                style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
              >
                TABACUM VANNILLA
              </h4>
              <p
                className="text-gray-300 text-sm mb-3 leading-relaxed"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
              >
                A rich blend of warm tobacco and luxurious vanilla, crafted in the Roman tradition
              </p>
              
              {/* Rating Stars */}
              <div className="flex justify-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c4996b] text-[#c4996b]" />
                ))}
              </div>
              
              {/* Price Preview */}
              <div className="flex justify-center items-center space-x-3 mb-4">
                <span
                  className="text-gray-500 line-through text-sm"
                  style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                >
                  ₹2499
                </span>
                <span
                  className="text-[#c4996b] font-bold text-lg"
                  style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                >
                  ₹1499
                </span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  LAUNCH OFFER
                </span>
              </div>
              {/* Shop Now Button or Launch Info */}
              {(launched) ? (
                <Button
                  className="w-full sm:w-auto bg-[#c4996b] hover:bg-[#c4996b]/90 text-black font-semibold py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#c4996b]/20 text-sm sm:text-base mt-2"
                  style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                >
                  SHOP NOW
                </Button>
              ) : (
                <div className="text-[#c4996b] text-xs sm:text-sm mt-2 font-semibold" style={{ fontFamily: "'Times New Roman', Garamond, serif" }}>
                  Launching on {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-8">
          {[
            { icon: Instagram, href: "#" },
            { icon: Facebook, href: "#" },
            { icon: Linkedin, href: "#" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="text-[#c4996b] hover:text-[#c4996b]/80 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              aria-label={`Follow us on ${social.icon.name}`}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p style={{ fontFamily: "'Times New Roman', Garamond, serif" }}>© {new Date().getFullYear()} Marzenos. All rights reserved.
            <span className="mx-2 text-[#c4996b]">|</span>
            <a
              href="/contact"
              className="text-[#c4996b] hover:underline hover:text-[#c4996b]/80 font-semibold transition-colors duration-200"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}