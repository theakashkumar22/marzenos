"use client"

import { use, useState } from "react"
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, ArrowLeft, Share2, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import blogData from "@/data/blog-posts.json"
import { notFound } from "next/navigation"

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { posts } = blogData
  const post = posts.find((p) => p.id === Number.parseInt(id))
  const [copied, setCopied] = useState(false)

  if (!post) {
    notFound()
  }

  const relatedPosts = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }

    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          // If sharing fails, fall back to copying URL
          copyToClipboard()
        }
      }
    } else {
      // Fallback to copying URL to clipboard
      copyToClipboard()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <article className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#c4996b] hover:text-[#c4996b]/80 transition-colors duration-300 mb-8 animate-slide-in-left"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Link>

          {/* Article Header */}
          <header className="mb-12 animate-fade-in">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
              <span className="bg-[#c4996b]/20 text-[#c4996b] px-3 py-1 rounded-full font-semibold">
                {post.category}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold text-[#c4996b] mb-6 animate-slide-up"
              style={{
                fontFamily: "Garamond, 'Times New Roman', serif",
                letterSpacing: "0.111em",
                lineHeight: "1.4",
              }}
            >
              {post.title}
            </h1>

            <p
              className="text-xl text-gray-300 leading-relaxed mb-8 animate-slide-up-delayed"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between animate-fade-in-delayed">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#c4996b]/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#c4996b]" />
                </div>
                <div>
                  <p className="font-semibold text-[#c4996b]">{post.author}</p>
                  <p className="text-sm text-gray-400">Master Perfumer</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-[#c4996b]/30 text-[#c4996b] hover:bg-[#c4996b]/10 bg-transparent transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </>
                )}
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 animate-zoom-in">
            <Image
              src={post.image || "/placeholder.svg?height=500&width=800"}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl border border-[#c4996b]/20"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none animate-fade-in">
            <div
              className="text-gray-300 leading-relaxed space-y-6"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-[#c4996b]/20">
              <h3
                className="text-3xl font-bold text-[#c4996b] mb-8 animate-fade-in"
                style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
              >
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <article className="glass-effect rounded-xl overflow-hidden hover:bg-[#c4996b]/5 transition-all duration-500 transform hover:scale-105">
                      <Image
                        src={relatedPost.image || "/placeholder.svg?height=200&width=400"}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="p-6">
                        <h4
                          className="text-xl font-bold text-[#c4996b] mb-2 group-hover:text-[#c4996b]/80 transition-colors duration-300"
                          style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                        >
                          {relatedPost.title}
                        </h4>
                        <p
                          className="text-gray-300 text-sm"
                          style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                        >
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  )
}