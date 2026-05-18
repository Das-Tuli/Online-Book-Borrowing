"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { User, Mail, ShieldAlert, Edit2 } from "lucide-react";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <LoadingSpinner size="lg" fullScreen />;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="bg-white border border-stone-200 p-8 rounded-2xl text-center max-w-sm space-y-4 shadow-sm">
          <ShieldAlert className="mx-auto text-red-600 w-10 h-10" />
          <h3 className="text-stone-800 text-lg font-bold">Access Denied</h3>
          <p className="text-stone-500 text-sm">
            Please log in to view your profile details.
          </p>
          <Link href="/login" className="btn border-none bg-[#1e3f20] text-white hover:bg-[#1e3f20]/95 w-full rounded-xl">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="container mx-auto px-6 py-16 max-w-xl relative">
      <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl relative z-10 shadow-sm space-y-8">
        <div className="text-center space-y-4">
          {/* Avatar */}
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden border border-stone-200 shadow-sm">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-stone-50 flex items-center justify-center text-4xl text-[#1e3f20] font-bold border border-stone-200">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-stone-900">{user.name}</h2>
            <p className="text-xs text-[#1e3f20] font-bold tracking-wider uppercase mt-1">Reader Member</p>
          </div>
        </div>

        {/* User Info Details */}
        <div className="space-y-4 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Full Name</p>
              <p className="text-stone-850 font-bold text-sm">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Email Address</p>
              <p className="text-stone-850 font-bold text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Update Profile CTA */}
        <div className="pt-4">
          <Link
            href="/update-profile"
            className="w-full py-3.5 rounded-xl bg-stone-50 hover:bg-[#1e3f20] border border-stone-200 hover:border-[#1e3f20] flex items-center justify-center gap-2 text-sm font-semibold transition-all text-stone-700 hover:text-white"
          >
            <Edit2 size={16} />
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}
