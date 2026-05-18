import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 text-center max-w-lg space-y-6 relative z-10 shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] mb-2 animate-bounce">
          <Compass className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-200">Page Not Found</h2>
        
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="btn border-none bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white hover:opacity-90 transition-opacity rounded-xl px-8 flex items-center justify-center gap-2 w-full sm:w-auto mx-auto shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
