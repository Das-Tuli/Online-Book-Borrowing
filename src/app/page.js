"use client";

import Banner from "@/components/Banner";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturedBooks from "@/components/FeaturedBooks";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { Laptop, BookText, Compass, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Home() {
  const categories = [
    {
      name: "Story",
      icon: BookText,
      description: "Dive into fascinating novels, mysteries, and classic tales.",
      iconBg: "bg-blue-50 text-blue-800",
      link: "/all-books?category=Story",
    },
    {
      name: "Tech",
      icon: Laptop,
      description: "Master modern programming, AI, and systems architecture.",
      iconBg: "bg-[#1e3f20]/5 text-[#1e3f20]",
      link: "/all-books?category=Tech",
    },
    {
      name: "Science",
      icon: Compass,
      description: "Explore the cosmos, quantum mechanics, and nature's laws.",
      iconBg: "bg-amber-50 text-amber-800",
      link: "/all-books?category=Science",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      e.target.reset();
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <div className="relative">
      {/* Hero Banner */}
      <Banner />

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Featured Books Section */}
      <FeaturedBooks />

      {/* Trending Categories Section */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Trending <span className="text-[#1e3f20]">Categories</span>
            </h2>
            <p className="text-stone-500 mt-2">
              Browse books by our most popular genres and discover your next specialized read.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} href={cat.link} className="group block">
                  <div className="natural-card p-8 rounded-2xl flex flex-col items-center text-center h-full relative overflow-hidden">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform ${cat.iconBg}`}>
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-[#1e3f20] transition-colors">
                      {cat.name}
                    </h3>
                    
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    <span className="text-sm font-semibold text-[#1e3f20] group-hover:text-stone-900 transition-colors mt-auto flex items-center gap-1.5">
                      Explore {cat.name} &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reader Testimonials */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="border border-stone-200 bg-stone-50 max-w-4xl mx-auto p-8 md:p-16 rounded-3xl text-center relative overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-none">
                Never Miss a <span className="text-[#1e3f20]">New Release</span>
              </h2>
              <p className="text-stone-500 mb-8 md:text-lg leading-relaxed mt-4">
                Subscribe to our newsletter to receive updates on newly arrived books, author interviews, and exclusive digital reading features.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="bg-white border border-stone-200 text-stone-900 px-5 py-4 rounded-xl w-full text-base focus:outline-none focus:border-[#1e3f20] placeholder-stone-400 shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-lg border-none bg-[#1e3f20] text-white hover:bg-[#1e3f20]/95 transition-colors rounded-xl px-8 flex items-center justify-center gap-2 shrink-0 font-semibold"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
