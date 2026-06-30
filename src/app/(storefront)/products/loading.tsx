import React from "react";
import { ChevronRight } from "lucide-react";

export default function ProductsLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <nav className="flex text-sm text-[rgb(var(--muted-foreground))] mb-8">
        <ol className="flex items-center space-x-2">
          <li className="h-4 w-12 bg-[rgb(var(--muted))] rounded"></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="h-4 w-24 bg-[rgb(var(--muted))] rounded"></li>
        </ol>
      </nav>

      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="h-10 w-40 bg-[rgb(var(--muted))] rounded mb-2"></div>
          <div className="h-5 w-32 bg-[rgb(var(--muted))] rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Skeleton */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="h-5 w-24 bg-[rgb(var(--muted))] rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 w-32 bg-[rgb(var(--muted))] rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-[rgb(var(--muted))] w-full mb-4 rounded-xl"></div>
                <div className="px-1">
                  <div className="h-3 w-16 bg-[rgb(var(--muted))] rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-[rgb(var(--muted))] rounded mb-3"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-[rgb(var(--muted))] rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
