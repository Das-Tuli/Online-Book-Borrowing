import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="bg-[#ffffff] border-b border-stone-200 py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e3f20]"></span>
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Classic & Contemporary Catalog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-stone-900 tracking-tight">
              Find Your <br />
              <span className="text-[#1e3f20]">
                Next Read
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-stone-500 leading-relaxed">
              Step into a thoughtfully curated digital space. ReadSphere brings the entire library experience to your screen with a refined, fast, and completely distraction-free user interface.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/all-books"
                className="btn btn-lg border-none bg-[#1e3f20] hover:bg-[#1e3f20]/95 text-white transition-colors rounded-xl px-8 font-semibold shadow-sm"
              >
                Browse Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="btn btn-lg btn-outline border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl px-8 font-semibold"
              >
                Join for Free
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200 mt-6">
              <div>
                <h4 className="text-2xl font-bold text-stone-800">10k+</h4>
                <p className="text-xs text-stone-500 font-medium">Books Available</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-stone-800">50k+</h4>
                <p className="text-xs text-stone-500 font-medium">Active Readers</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-stone-800">4.9/5</h4>
                <p className="text-xs text-stone-500 font-medium">User Rating</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end">
            {/* Elegant editorial image grid */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-50 p-6 flex items-center justify-center">
              <div className="relative w-56 aspect-[3/4] rounded-xl overflow-hidden border border-stone-200 shadow-xl bg-white transition-transform hover:scale-[1.02] duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" 
                  alt="Editorial book cover" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute top-8 left-8 w-24 aspect-[3/4] rounded-lg overflow-hidden border border-stone-200 shadow-md bg-white -rotate-12 opacity-60 transition-all hover:-rotate-6">
                <img 
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400" 
                  alt="Background book" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
