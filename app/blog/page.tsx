"use client"

import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"
import blogData from "@/data/blog-posts.json"

export default function BlogPage() {
  // Sort posts by date descending (most recent first)
  const { posts } = blogData
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1
              className="text-5xl md:text-7xl font-bold text-[#c4996b] mb-6 animate-slide-down"
              style={{
                fontFamily: "Garamond, 'Times New Roman', serif",
                letterSpacing: "0.111em",
                lineHeight: "1.4",
              }}
            >
              JOURNAL
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              Discover the stories, traditions, and artistry behind our fragrances. Journey with us through the world of
              Roman perfumery.
            </p>
          </div>

          {/* Featured Post */}
          {sortedPosts.length > 0 && (
            <div className="mb-20 animate-zoom-in">
              <div className="relative overflow-hidden rounded-2xl glass-effect hover:bg-[#c4996b]/5 transition-all duration-500 group">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="relative">
                    <Image
                      src={sortedPosts[0].image || "/placeholder.svg"}
                      alt={sortedPosts[0].title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#c4996b] text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(sortedPosts[0].date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {sortedPosts[0].author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {sortedPosts[0].readTime}
                      </span>
                    </div>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-[#c4996b] group-hover:text-[#c4996b]/80 transition-colors duration-300"
                      style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                    >
                      {sortedPosts[0].title}
                    </h2>
                    <p
                      className="text-gray-300 leading-relaxed text-lg"
                      style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                    >
                      {sortedPosts[0].excerpt}
                    </p>
                    <Link
                      href={`/blog/${sortedPosts[0].id}`}
                      className="inline-flex items-center text-[#c4996b] hover:text-[#c4996b]/80 transition-colors duration-300 font-semibold"
                    >
                      Read More{" "}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="glass-effect rounded-xl overflow-hidden hover:bg-[#c4996b]/5 transition-all duration-500 transform hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#c4996b]/20 text-[#c4996b] px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold text-[#c4996b] mb-3 group-hover:text-[#c4996b]/80 transition-colors duration-300"
                    style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-gray-300 leading-relaxed mb-4"
                    style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{post.author}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#c4996b] hover:text-[#c4996b]/80 transition-colors duration-300 font-semibold text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
