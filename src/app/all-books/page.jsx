"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CategorySidebar from "@/components/CategorySidebar";
import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Search, Info } from "lucide-react";

function AllBooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let url = `/api/books?category=${activeCategory}`;
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
          All <span className="text-[#1e3f20]">Books</span>
        </h1>
        <p className="text-stone-500 mt-2">
          Find your next educational guide or fantasy novel in our comprehensive digital collection.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CategorySidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-stone-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search books by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-stone-200 text-stone-900 pl-12 pr-4 py-4 rounded-xl w-full text-base focus:outline-none focus:border-[#1e3f20] placeholder-stone-400 shadow-sm transition-all"
            />
          </div>

          {/* Books Grid */}
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id || book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-stone-200 p-12 rounded-2xl text-center max-w-md mx-auto space-y-4 shadow-sm">
              <Info className="mx-auto text-stone-400 w-10 h-10" />
              <h3 className="text-stone-800 text-lg font-bold">No books found</h3>
              <p className="text-stone-500 text-sm">
                We couldn't find any books matching your criteria. Try adjusting your filter or search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AllBooks() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" fullScreen />}>
      <AllBooksContent />
    </Suspense>
  );
}
