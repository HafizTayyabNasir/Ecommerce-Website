import React from "react";
import { ChevronRight } from "lucide-react";

export default function ProductLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <nav className="flex text-sm text-[rgb(var(--muted-foreground))] mb-8 lg:mb-12">
        <ol className="flex items-center space-x-2">
          <li className="h-4 w-12 bg-[rgb(var(--muted))] rounded"></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="h-4 w-16 bg-[rgb(var(--muted))] rounded"></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="h-4 w-24 bg-[rgb(var(--muted))] rounded"></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="h-4 w-32 bg-[rgb(var(--muted))] rounded"></li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery Skeleton */}
        <div>
          <div className="aspect-[3/4] w-full bg-[rgb(var(--muted))] rounded-xl mb-4"></div>
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square w-20 bg-[rgb(var(--muted))] rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Right: Product Info Skeleton */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="h-10 w-3/4 bg-[rgb(var(--muted))] rounded mb-4"></div>
            <div className="h-4 w-32 bg-[rgb(var(--muted))] rounded mb-6"></div>
            
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-[rgb(var(--muted))] rounded"></div>
              <div className="h-4 w-full bg-[rgb(var(--muted))] rounded"></div>
              <div className="h-4 w-2/3 bg-[rgb(var(--muted))] rounded"></div>
            </div>
          </div>

          {/* Add to Cart skeleton area */}
          <div className="mb-10 space-y-6">
            <div>
              <div className="h-4 w-12 bg-[rgb(var(--muted))] rounded mb-2"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-12 bg-[rgb(var(--muted))] rounded"></div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="h-4 w-12 bg-[rgb(var(--muted))] rounded mb-2"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-16 bg-[rgb(var(--muted))] rounded"></div>
                ))}
              </div>
            </div>
            
            <div className="h-14 w-full bg-[rgb(var(--muted))] rounded-xl"></div>
          </div>

          <div className="h-20 w-full bg-[rgb(var(--muted))] rounded mb-4 border-y border-[rgb(var(--border))]"></div>
        </div>
      </div>
    </div>
  );
}
