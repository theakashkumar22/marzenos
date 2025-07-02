"use client"

import Navigation from "@/components/navigation"
import Image from "next/image"
import { Award, Users, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We pursue perfection in every bottle, honoring the ancient Roman tradition of craftsmanship.",
    },
    {
      icon: Users,
      title: "Heritage",
      description: "Our fragrances are inspired by centuries of Roman perfumery, passed down through generations.",
    },
    {
      icon: Globe,
      title: "Authenticity",
      description: "We source the finest ingredients from around the world, just as the Romans did centuries ago.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every fragrance is created with love and dedication to the art of perfumery.",
    },
  ]

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
              OUR STORY
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              Born from the ancient traditions of Roman perfumery, Marzenos represents the perfect fusion of classical
              elegance and modern sophistication.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-up">
              <Image
                src="/about-us.jpg"
                alt="Ancient Roman Perfumery Heritage"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl border border-[#c4996b]/20 hover:shadow-[#c4996b]/30 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg"></div>
            </div>
            <div className="space-y-6 animate-slide-up-delayed">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#c4996b] mb-6"
                style={{
                  fontFamily: "Garamond, 'Times New Roman', serif",
                  letterSpacing: "0.111em",
                }}
              >
                A Legacy Reborn
              </h2>
              <p
                className="text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
              >
                In the bustling markets of ancient Rome, master perfumers crafted fragrances that would transport
                emperors and citizens alike to realms of divine beauty. These artisans understood that scent was more
                than mere fragrance—it was a gateway to emotion, memory, and the sublime.
              </p>
              <p
                className="text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
              >
                Today, Marzenos carries forward this sacred tradition. Our master perfumers have spent decades studying
                ancient Roman techniques, combining them with modern innovation to create fragrances that honor the past
                while embracing the future.
              </p>
              <p
                className="text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
              >
                Each bottle of Marzenos contains not just fragrance, but history, artistry, and the timeless pursuit of
                olfactory perfection.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2
              className="text-4xl md:text-5xl font-bold text-[#c4996b] text-center mb-16 animate-fade-in"
              style={{
                fontFamily: "Garamond, 'Times New Roman', serif",
                letterSpacing: "0.111em",
              }}
            >
              OUR VALUES
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg glass-effect hover:bg-[#c4996b]/10 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <value.icon className="w-12 h-12 text-[#c4996b] mx-auto mb-4 animate-float" />
                  <h3
                    className="text-xl font-bold text-[#c4996b] mb-3"
                    style={{ fontFamily: "Garamond, 'Times New Roman', serif" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-gray-300 leading-relaxed"
                    style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="text-center max-w-4xl mx-auto animate-zoom-in">
            <h2
              className="text-4xl md:text-5xl font-bold text-[#c4996b] mb-8"
              style={{
                fontFamily: "Garamond, 'Times New Roman', serif",
                letterSpacing: "0.111em",
              }}
            >
              OUR MISSION
            </h2>
            <p
              className="text-xl text-gray-300 leading-relaxed mb-8"
              style={{ fontFamily: "'Times New Roman', Garamond, serif" }}
            >
              To create fragrances that transcend time, connecting the wearer to the eternal beauty and sophistication
              of ancient Rome while celebrating the innovation and artistry of the modern world.
            </p>
            <div className="w-24 h-1 bg-[#c4996b] mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
