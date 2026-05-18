"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      text: "ReadSphere has completely transformed how I consume tech books. The clean, lightweight warm editorial interface makes reading late at night absolute bliss. A flawless digital library experience!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Literature Student",
      text: "The selection of storybooks and novels is amazing. The borrowing process is incredibly smooth—just one click and I have access to my next adventure. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: 3,
      name: "Dr. David Carter",
      role: "Science Researcher",
      text: "I love the clean taxonomy. Finding deep science articles and books is so easy with the smart categorization. The news ticker keeps me updated on the newest arrivals.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            What Our <span className="text-[#1e3f20]">Readers Say</span>
          </h2>
          <p className="text-stone-500 mt-2">
            Hear from our community of book enthusiasts, students, and professionals who use ReadSphere daily.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl flex flex-col items-center text-center relative shadow-sm">
                  <Quote className="absolute top-6 left-6 text-[#1e3f20]/5 w-16 h-16 pointer-events-none" />
                  
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-200 mb-5 shadow-sm">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-base md:text-lg text-stone-600 italic leading-relaxed mb-5 max-w-2xl">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <h4 className="text-stone-950 font-bold text-base">{t.name}</h4>
                  <p className="text-xs text-[#1e3f20] font-semibold tracking-wider uppercase mt-0.5">{t.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Adjust Swiper bullets color to match theme */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d6d3d1 !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #1e3f20 !important;
          width: 18px !important;
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
        }
      `}</style>
    </section>
  );
}
