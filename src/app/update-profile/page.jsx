"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { User, Image, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhotoUrl(session.user.image || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name,
        image: photoUrl || undefined,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      toast.error(err.message || "An error occurred during profile update.");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return <LoadingSpinner size="lg" fullScreen />;
  }

  if (!session) {
    return null; // Handled by middleware or profile page
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-xl relative">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-[#1e3f20] transition-colors mb-8 group font-medium"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Profile
      </Link>

      <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl relative z-10 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">
            Update <span className="text-[#1e3f20]">Information</span>
          </h2>
          <p className="mt-1.5 text-sm text-stone-500">
            Keep your profile details up to date.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3.5 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Photo URL</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Image size={18} />
                </span>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3.5 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={updating}
              className="w-full flex justify-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white bg-[#1e3f20] hover:bg-[#1e3f20]/95 focus:outline-none transition-all disabled:opacity-50 shadow-sm cursor-pointer"
            >
              {updating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <Save className="mr-2 w-4.5 h-4.5" />
                  Update Information
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
