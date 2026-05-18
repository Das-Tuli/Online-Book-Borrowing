"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books?limit=4");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch featured books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured <span className="text-[#1e3f20]">Books</span>
            </h2>
            <p className="text-stone-500 mt-2 max-w-2xl">
              Explore our hand-picked selection of the most popular and highly-rated books this week.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id || book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
