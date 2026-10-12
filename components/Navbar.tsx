"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, X, User } from "lucide-react";
// import { useShop } from "@/app/context/ShopContext"; // Adjust path

interface SearchResult {
  id: string;
  title: string;
  price: number;
  discount_price: number | null;
  images: string[] | null;
}

interface NavbarProps {
  storeId?: string;
  storeName?: string;
  logoUrl?: string | null;
  promoText?: string | null;
  isMini?: boolean;
}

// 1. تعريف العلامات التجارية كأقسام (Categories)
const BRANDS = [
  "Kayali",
  "French Breeze",
  "Burberry",
  "Gucci",
  "Tom Ford",
  "Lattafa & Arabic Niche",
];

export default function Navbar({
  storeId,
  storeName = "Store",
  logoUrl,
  promoText = "",
  isMini = false,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //   const { cartCount, favCount } = useShop();

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for bottom navbar search trigger
  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    window.addEventListener("open-search-modal", handleOpenSearch);
    return () =>
      window.removeEventListener("open-search-modal", handleOpenSearch);
  }, []);

  // Lock body scroll when search is open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  // Mock Search Debounce (Wire to your API later)
  useEffect(() => {
    if (!searchOpen || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    const timer = setTimeout(async () => {
      // MOCK: Replace with real fetch: fetch(`/api/search?q=${searchQuery}`)
      console.log("Searching for:", searchQuery);
      setSearchResults([]);
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, searchOpen]);

  return (
    <>
      {/* Top Promo Bar */}
      {promoText && (
        <div className="w-full bg-zinc-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
          {promoText}
        </div>
      )}

      {/* Main Header */}
      <header
        className={`z-40 w-full transition-all duration-200 sticky top-0 flex flex-col ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-200"
            : "bg-white border-b border-zinc-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={storeName}
                  className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
                  {storeName.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>

            {/* Desktop Navigation (Hidden in Mini Plan) */}
            {!isMini && (
              <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
                <Link
                  href="/categories"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/new-arrivals"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/sale"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Sale
                </Link>
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-5 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Search"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>

              {!isMini && (
                <Link
                  href="/profile"
                  className="hidden md:flex text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  <User size={22} strokeWidth={1.5} />
                </Link>
              )}

              <Link
                href="/favorites"
                className="relative text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <Heart size={22} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                className="relative text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Brand Categories Section */}
        {/* 
            Mobile: Horizontal scroll, hidden scrollbar, no wrap (flex-nowrap).
            Desktop (md): Wrap to new line if it exceeds max-width (flex-wrap).
        */}
        <div className="w-full border-t border-zinc-100 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul
              className="flex items-center gap-6 py-2.5 md:py-3 
                         overflow-x-auto md:overflow-x-visible md:flex-wrap
                         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {BRANDS.map((brand, idx) => (
                <li key={idx} className="shrink-0">
                  <Link
                    href={`/category/${brand.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                    className="text-[13px] md:text-sm font-medium text-zinc-500 hover:text-zinc-900 whitespace-nowrap transition-colors"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Premium Command-K Style Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-zinc-900/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-zinc-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-4 border-b border-zinc-100">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent px-4 py-1 text-lg outline-none placeholder:text-zinc-400 text-zinc-900"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-zinc-50/50 min-h-[200px] max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="flex flex-col items-center justify-center h-40 opacity-50">
                  <Search
                    size={32}
                    strokeWidth={1.5}
                    className="text-zinc-400 mb-2"
                  />
                  <span className="text-sm text-zinc-500">
                    Start typing to search...
                  </span>
                </div>
              ) : searchLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-6 h-6 border-2 border-zinc-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  {/* Map your search results here */}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-sm text-zinc-900 font-medium mb-1">
                    No results found
                  </p>
                  <p className="text-xs text-zinc-500">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
