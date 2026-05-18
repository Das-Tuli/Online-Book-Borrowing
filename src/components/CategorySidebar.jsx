"use client";

import { Laptop, BookText, Compass, ListFilter } from "lucide-react";

export default function CategorySidebar({ activeCategory, setActiveCategory }) {
  const categories = [
    { name: "All", icon: ListFilter },
    { name: "Story", icon: BookText },
    { name: "Tech", icon: Laptop },
    { name: "Science", icon: Compass },
  ];

  return (
    <aside className="bg-white border border-stone-200 p-6 rounded-2xl h-fit lg:sticky lg:top-24 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-5 flex items-center gap-2">
        <ListFilter size={14} className="text-[#1e3f20]" />
        Categories
      </h2>

      <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-3 lg:pb-0 lg:overflow-x-visible no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 border whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#1e3f20] border-[#1e3f20] text-white"
                  : "bg-transparent border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50"
              }`}
            >
              <Icon size={16} />
              {cat.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
