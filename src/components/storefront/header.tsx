"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

const navigation = [
  { name: "New Arrivals", href: "/collections/new-arrivals" },
  {
    name: "Shop",
    href: "/products",
    children: [
      { name: "All Products", href: "/products" },
      { name: "Tees & Tops", href: "/collections/tees-tops" },
      { name: "Hoodies & Sweats", href: "/collections/hoodies-sweats" },
      { name: "Joggers & Pants", href: "/collections/joggers-pants" },
      { name: "Shorts", href: "/collections/shorts" },
      { name: "Accessories", href: "/collections/accessories" },
    ],
  },
  { name: "Collections", href: "/collections" },
  { name: "Sale", href: "/collections/sale" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  
  const getCartCount = useCartStore((state) => state.getCartCount);
  const [cartCount, setCartCount] = useState(0);

  // Avoid hydration mismatch
  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount, useCartStore.getState().items]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-center py-2 px-4">
        <p className="text-xs font-medium tracking-widest uppercase">
          Free shipping on orders over $100 · Use code{" "}
          <span className="font-bold text-[rgb(var(--accent))]">STREET25</span>{" "}
          for 25% off
        </p>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "glass border-b border-[rgb(var(--border))] shadow-sm"
            : "bg-[rgb(var(--background))]"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-[rgb(var(--foreground))] rounded-sm flex items-center justify-center group-hover:bg-[rgb(var(--accent))] transition-colors duration-300">
                  <span className="text-[rgb(var(--background))] font-black text-lg font-['Space_Grotesk']">
                    Z
                  </span>
                </div>
              </div>
              <span className="hidden sm:block font-['Space_Grotesk'] font-bold text-xl tracking-tight">
                Zero Lifestyle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200",
                      pathname === item.href ||
                        pathname?.startsWith(item.href + "/")
                        ? "text-[rgb(var(--accent))]"
                        : "text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent))]"
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg shadow-lg py-2 min-w-[200px] animate-scale-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))] transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full hover:bg-[rgb(var(--secondary))] transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-[rgb(var(--secondary))] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-[rgb(var(--secondary))] transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2.5 rounded-full hover:bg-[rgb(var(--secondary))] transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-[rgb(var(--accent))] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-[rgb(var(--border))] animate-fade-in">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--muted-foreground))]" />
                <input
                  type="search"
                  placeholder="Search products, collections, and more..."
                  className="w-full h-12 pl-12 pr-4 bg-[rgb(var(--secondary))] rounded-lg border-0 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[rgb(var(--muted))]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-[rgb(var(--background))] shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight">
                  Zero Lifestyle
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-3 text-base font-medium uppercase tracking-wide border-b border-[rgb(var(--border))]",
                        pathname === item.href
                          ? "text-[rgb(var(--accent))]"
                          : "text-[rgb(var(--foreground))]"
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 space-y-1 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block py-2 text-sm text-[rgb(var(--muted-foreground))]"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-[rgb(var(--border))] space-y-4">
                <Link
                  href="/account"
                  className="flex items-center gap-3 py-2 text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 py-2 text-sm font-medium"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
