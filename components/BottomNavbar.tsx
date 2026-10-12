"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Search, User } from "lucide-react";
// import { useShop } from "@/app/context/ShopContext"; // Adjust path

export default function BottomNavbar() {
  const pathname = usePathname();
  //   const { cartCount } = useShop();

  const handleOpenSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-search-modal"));
  };

  const isActive = (path: string) => {
    if (path.startsWith("#")) return false;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/categories", icon: LayoutGrid },
    { label: "Search", href: "#", icon: Search, onClick: handleOpenSearch },
    { label: "Cart", href: "/cart", icon: ShoppingBag, isCart: true },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-zinc-200 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-full h-full gap-1 group tap-highlight-transparent"
            >
              <div
                className={`transition-all duration-200 relative ${
                  active
                    ? "text-blue-600 scale-110"
                    : "text-zinc-500 group-hover:text-zinc-900"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2 : 1.5} />

                {/* {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-blue-600 text-white text-[9px] font-bold px-1 ring-2 ring-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )} */}
              </div>
              <span
                className={`text-[10px] transition-colors duration-200 ${
                  active
                    ? "text-blue-600 font-semibold"
                    : "text-zinc-500 font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
