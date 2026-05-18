"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Lock, Image, UserPlus, Globe } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: avatarUrl || undefined,
      });

      if (error) {
        throw new Error(error.message || "Failed to register");
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Failed to register with Google.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 flex justify-center items-center">
      <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl w-full max-w-md shadow-sm space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Create <span className="text-[#1e3f20]">Account</span>
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Join ReadSphere to build your virtual bookshelves today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>

            {/* Avatar Image URL */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">Avatar Image URL (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Image size={18} />
                </span>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-white border border-stone-200 text-stone-900 pl-10 pr-4 py-3 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3f20] focus:ring-1 focus:ring-[#1e3f20]"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white bg-[#1e3f20] hover:bg-[#1e3f20]/95 transition-all disabled:opacity-50 shadow-sm cursor-pointer"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <UserPlus className="mr-2 w-4.5 h-4.5" />
                  Sign Up
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-stone-200 w-full absolute"></div>
          <span className="bg-white px-3 text-xs text-stone-400 uppercase tracking-widest font-bold z-10">Or connect with</span>
        </div>

        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-4 border border-stone-200 rounded-xl bg-stone-50 text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-4 h-4 text-stone-500" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-stone-500 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1e3f20] font-bold hover:underline">
            Sign In Instead
          </Link>
        </p>
      </div>
    </div>
  );
}
