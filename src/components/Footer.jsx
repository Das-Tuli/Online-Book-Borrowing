import Link from "next/link";
import { BookOpen, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#1e3f20] w-6 h-6" />
              <span className="text-xl font-bold tracking-tight text-[#1e3f20]">
                ReadSphere
              </span>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs">
              Your modern digital library. Discover, explore, and borrow the best books across all genres with our seamless platform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-[#1e3f20] hover:border-[#1e3f20] hover:text-white transition-all shadow-sm">
                <Globe size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-[#1e3f20] hover:border-[#1e3f20] hover:text-white transition-all shadow-sm">
                <BookOpen size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-[#1e3f20] hover:border-[#1e3f20] hover:text-white transition-all shadow-sm">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">Home</Link></li>
              <li><Link href="/all-books" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">All Books</Link></li>
              <li><Link href="/login" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">Login / Register</Link></li>
              <li><Link href="/profile" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">My Profile</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Top Categories</h3>
            <ul className="space-y-2.5">
              <li><Link href="/all-books?category=Tech" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">Technology</Link></li>
              <li><Link href="/all-books?category=Story" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">Story</Link></li>
              <li><Link href="/all-books?category=Science" className="text-stone-500 hover:text-[#1e3f20] transition-colors text-sm font-medium">Science</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-stone-500 text-sm font-medium">
                <Mail size={14} className="text-[#1e3f20]" />
                support@readsphere.com
              </li>
              <li className="text-stone-500 text-xs mt-3 leading-relaxed">
                Subscribe to our newsletter for the latest book arrivals.
              </li>
              <li className="mt-2.5">
                <form className="flex gap-1">
                  <input type="email" placeholder="Email address" className="bg-white border border-stone-200 text-stone-900 px-3.5 py-2.5 rounded-lg w-full text-xs focus:outline-none focus:border-[#1e3f20] shadow-inner" />
                  <button className="bg-[#1e3f20] text-white px-3.5 py-2.5 rounded-lg text-xs hover:bg-[#1e3f20]/95 transition-colors font-semibold">
                    Subscribe
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} ReadSphere. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-stone-400 hover:text-stone-600 text-xs transition-colors font-medium">Privacy Policy</Link>
            <Link href="#" className="text-stone-400 hover:text-stone-600 text-xs transition-colors font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
