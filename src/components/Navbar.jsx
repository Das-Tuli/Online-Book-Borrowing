"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { BookOpen, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },
  ];

  if (session) {
    navLinks.push({ name: "My Profile", href: "/profile" });
  }

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#e7e5e4] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <BookOpen className="text-[#1e3f20] w-6 h-6 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-[#1e3f20]">
              ReadSphere
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#1e3f20] ${
                    pathname === link.href ? "text-[#1e3f20] font-semibold" : "text-stone-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-stone-200 pl-6">
              {session ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-stone-200 hover:border-[#1e3f20]">
                    <div className="w-10 rounded-full">
                      {session.user.image ? (
                        <img alt={session.user.name} src={session.user.image} />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center text-sm font-bold text-stone-700">
                          {session.user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-[#ffffff] border border-stone-200 rounded-2xl w-56">
                    <li className="px-4 py-3 border-b border-stone-100 mb-2">
                      <p className="font-semibold text-stone-800 p-0">{session.user.name}</p>
                      <p className="text-xs text-stone-500 p-0 truncate">{session.user.email}</p>
                    </li>
                    <li>
                      <Link href="/profile" className="hover:text-[#1e3f20] rounded-xl py-2">
                        <User size={16} /> Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-red-600 hover:text-red-500 hover:bg-red-50 rounded-xl py-2">
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-sm border-none bg-[#1e3f20] text-white hover:bg-[#1e3f20]/90 transition-colors rounded-lg px-6 font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost btn-circle text-stone-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-t border-stone-200 absolute w-full left-0 shadow-lg">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-3 rounded-xl text-sm font-medium ${
                  pathname === link.href ? "bg-stone-50 text-[#1e3f20] font-semibold" : "text-stone-600 hover:bg-stone-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!session && (
              <Link
                href="/login"
                className="btn border-none mt-2 bg-[#1e3f20] text-white w-full rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
            {session && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-outline border-stone-200 text-red-600 hover:bg-red-50 mt-2 w-full rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
