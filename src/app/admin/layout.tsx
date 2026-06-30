"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tag,
  FolderOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Boxes,
  Truck,
  Star,
  FileText,
  Image,
  Shield,
  Bell,
  Percent,
  Gift,
  Menu,
  X,
} from "lucide-react";

const sidebarNav = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Sales",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Discounts", href: "/admin/discounts", icon: Percent },
      { name: "Gift Cards", href: "/admin/gift-cards", icon: Gift },
    ],
  },
  {
    title: "Catalog",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Collections", href: "/admin/collections", icon: FolderOpen },
      { name: "Inventory", href: "/admin/inventory", icon: Boxes },
      { name: "Reviews", href: "/admin/reviews", icon: Star },
    ],
  },
  {
    title: "Customers",
    items: [
      { name: "Customers", href: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Pages", href: "/admin/content", icon: FileText },
      { name: "Blog", href: "/admin/content/blog", icon: FileText },
      { name: "Banners", href: "/admin/content/banners", icon: Image },
    ],
  },
  {
    title: "Configuration",
    items: [
      { name: "Shipping", href: "/admin/shipping", icon: Truck },
      { name: "Taxes", href: "/admin/taxes", icon: Tag },
      { name: "Staff", href: "/admin/staff", icon: Shield },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[rgb(var(--secondary))]">
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-[rgb(var(--background))] border-r border-[rgb(var(--border))] flex flex-col transition-all duration-300",
          isCollapsed ? "w-[68px]" : "w-[260px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[rgb(var(--border))]">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[rgb(var(--accent))] rounded flex items-center justify-center">
                <span className="text-white font-black text-sm font-['Space_Grotesk']">
                  S
                </span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-base">
                ADMIN
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-[rgb(var(--secondary))] transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {sidebarNav.map((group) => (
            <div key={group.title} className="mb-6">
              {!isCollapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgb(var(--muted-foreground))] px-3 mb-2">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" &&
                      pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[rgb(var(--accent))] text-white"
                          : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]"
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[rgb(var(--border))]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-[rgb(var(--background))] border-b border-[rgb(var(--border))] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -ml-2"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold capitalize">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname?.split("/").pop()?.replace(/-/g, " ") || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-[rgb(var(--secondary))] transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[rgb(var(--accent))] rounded-full" />
            </button>
            <div className="w-8 h-8 bg-[rgb(var(--accent))] rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
