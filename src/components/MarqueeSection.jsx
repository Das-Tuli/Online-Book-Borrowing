export default function MarqueeSection() {
  return (
    <div className="bg-stone-50 border-y border-stone-200 py-3.5 overflow-hidden relative">
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#fbfbf9] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#fbfbf9] to-transparent z-10"></div>
      
      <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] flex items-center gap-12 text-[#1e3f20]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 text-sm font-semibold tracking-wide">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>New Arrivals: Atomic Habits</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e3f20]"></span>
              <span>Special Discount on Memberships</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>New Science Collection Added</span>
            </span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
