"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, User, MessageCircle } from "lucide-react"
import Navigation from "@/components/navigation"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)
    const { name, email, message } = form
    if (!name || !email || !message) {
      setError("All fields are required.")
      setLoading(false)
      return
    }
    const { error } = await supabase.from("contact").insert([{ name, email, message }])
    if (error) {
      setError("There was an error. Please try again.")
    } else {
      setSuccess("Thank you for contacting us! We'll get back to you soon.")
      setForm({ name: "", email: "", message: "" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden animate-fade-in">
      <Navigation />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-[#c4996b] to-transparent shimmer-effect"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-[#c4996b] to-transparent shimmer-effect"></div>
        <div className="hidden md:block absolute top-0 left-0 w-8 h-full bg-gradient-to-b from-transparent via-[#c4996b] to-transparent"></div>
        <div className="hidden md:block absolute top-0 right-0 w-8 h-full bg-gradient-to-b from-transparent via-[#c4996b] to-transparent"></div>
      </div>

      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#c4996b] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c4996b] opacity-60 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="mb-12 w-full max-w-lg bg-black/60 rounded-xl shadow-2xl border border-[#c4996b]/20 p-8 glass-effect animate-slide-up-delayed">
          <h1
            className="text-3xl md:text-4xl text-[#c4996b] font-bold mb-6 text-center"
            style={{
              fontFamily: "Garamond, 'Times New Roman', serif",
              letterSpacing: "0.111em",
              lineHeight: "1.4",
            }}
          >
            CONTACT US
          </h1>
          <p className="text-gray-300 text-center mb-8" style={{ fontFamily: "'Times New Roman', Garamond, serif" }}>
            We'd love to hear from you. Fill out the form below and our team will get in touch!
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c4996b] w-5 h-5 z-10 pointer-events-none" />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="pl-12 glass-effect text-white placeholder-gray-400 focus:border-[#c4996b] focus:ring-[#c4996b] transition-all duration-300"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c4996b] w-5 h-5 z-10 pointer-events-none" />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="pl-12 glass-effect text-white placeholder-gray-400 focus:border-[#c4996b] focus:ring-[#c4996b] transition-all duration-300"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                required
              />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-4 text-[#c4996b] w-5 h-5 z-10 pointer-events-none" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                spellCheck={false}
                className="pl-12 pt-3 glass-effect text-white placeholder-gray-400 focus:border-[#c4996b] focus:ring-[#c4996b] transition-all duration-300 w-full rounded-lg bg-transparent border border-[#c4996b]/20"
                style={{ fontFamily: "'Times New Roman', Garamond, serif", resize: "vertical" }}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">{success}</div>}
            <Button
              type="submit"
              className="w-full bg-[#c4996b] hover:bg-[#c4996b]/90 text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#c4996b]/20"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
              disabled={loading}
            >
              {loading ? "Sending..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          <p style={{ fontFamily: "'Times New Roman', Garamond, serif" }}>© {new Date().getFullYear()} Marzenos. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}