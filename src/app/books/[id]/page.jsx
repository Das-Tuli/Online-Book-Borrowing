"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { ArrowLeft, User, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function BookDetails({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Failed to load book details");
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        toast.error("Could not load book details.");
        router.push("/all-books");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, router]);

  const handleBorrow = async () => {
    if (!book || book.available_quantity <= 0) return;

    setBorrowing(true);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");
      setBook(data.book);
    } catch (err) {
      toast.error(err.message || "An error occurred while borrowing.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" fullScreen />;
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Back Button */}
      <Link
        href="/all-books"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-[#1e3f20] transition-colors mb-8 group font-medium"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to All Books
      </Link>

      {/* Main Details */}
      <div className="bg-white border border-stone-200 p-6 md:p-12 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          {/* Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative aspect-[3/4] w-full max-w-sm rounded-xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src={book.image_url}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details content */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-semibold text-[#1e3f20]">
              {book.category}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
              {book.title}
            </h1>

            <p className="text-base text-stone-500 font-medium flex items-center gap-2">
              <User size={18} className="text-amber-700" />
              By <span className="text-stone-850 font-bold">{book.author}</span>
            </p>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-stone-900 font-bold text-lg mb-2">Description</h3>
              <p className="text-stone-500 leading-relaxed text-sm md:text-base">{book.description}</p>
            </div>

            {/* Borrow Info */}
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Availability</p>
                {book.available_quantity > 0 ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle size={16} />
                    {book.available_quantity} copies available
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-700 font-bold">
                    <AlertTriangle size={16} />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={handleBorrow}
                disabled={book.available_quantity <= 0 || borrowing}
                className="btn btn-lg border-none bg-[#1e3f20] hover:bg-[#1e3f20]/95 text-white transition-colors rounded-xl px-10 shadow-sm disabled:opacity-40 disabled:shadow-none"
              >
                {borrowing ? (
                  <span className="loading loading-spinner"></span>
                ) : book.available_quantity > 0 ? (
                  "Borrow This Book"
                ) : (
                  "Currently Unavailable"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
