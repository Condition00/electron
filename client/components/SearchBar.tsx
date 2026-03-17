"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { API_BASE_URL, type ApiProduct } from "@/lib/api";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ApiProduct[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/products?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) return;
      const data: ApiProduct[] = await res.json();
      setSuggestions(data.slice(0, 7));
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToSearch = () => {
    if (!query.trim()) return;
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearch();
  };

  return (
    <div ref={containerRef} className="md:flex relative w-full hidden">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-xl overflow-visible border border-gray-200 focus-within:border-color2 transition-colors shadow-sm"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          placeholder="Search products..."
          className="flex-1 bg-transparent px-6 py-3 text-sm outline-none font-opensans text-color1 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="px-3 py-2 text-gray-400 hover:text-color2 transition-colors"
          aria-label="Search"
        >
          <Search size={17} />
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((p) => (
            <li key={p._id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setShowDropdown(false);
                  setQuery(p.name);
                  router.push(`/product/${p._id}`);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
              >
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-8 h-8 object-cover rounded-md shrink-0"
                  />
                )}
                <span className="flex-1 font-opensans truncate text-color1">
                  {p.name}
                </span>
                <span className="text-gray-400 text-xs shrink-0">₹{p.price}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={goToSearch}
              className="w-full px-4 py-2 text-xs text-center text-color2 hover:bg-gray-50 border-t border-gray-100 font-opensans"
            >
              See all results for &ldquo;{query}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
