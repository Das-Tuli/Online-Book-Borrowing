import Link from "next/link";
import { Book, Star } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="natural-card flex flex-col h-full group overflow-hidden rounded-xl bg-white border border-stone-200">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 border-b border-stone-200">
        <img
          src={book.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md border border-stone-200 text-xs font-semibold text-[#1e3f20] shadow-sm">
          {book.category}
        </div>
        {book.available_quantity > 0 ? (
          <div className="absolute top-3 right-3 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-sm">
            {book.available_quantity} Left
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-red-50 px-3 py-1 rounded-md border border-red-200 text-xs font-semibold text-red-800 shadow-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex items-center gap-1 text-amber-600 mb-2">
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} className="text-stone-300" />
          <span className="text-xs text-stone-500 ml-1 font-semibold">(4.0)</span>
        </div>
        
        <h3 className="text-base font-bold text-stone-900 mb-1 line-clamp-1 group-hover:text-[#1e3f20] transition-colors leading-snug">
          {book.title}
        </h3>
        <p className="text-xs text-stone-500 mb-4 font-medium">By {book.author}</p>
        
        <div className="mt-auto pt-4 border-t border-stone-100">
          <Link
            href={`/books/${book.id || book._id}`}
            className="w-full py-2 rounded-lg bg-stone-50 hover:bg-[#1e3f20] border border-stone-200 hover:border-[#1e3f20] flex items-center justify-center gap-2 text-xs font-semibold transition-all text-stone-700 hover:text-white"
          >
            <Book size={14} />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
