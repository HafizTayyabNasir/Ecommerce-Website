import React from "react";
import { ChevronRight } from "lucide-react";

export default function CollectionsLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <nav className="flex text-sm text-[rgb(var(--muted-foreground))] mb-8">
        <ol className="flex items-center space-x-2">
          <li className="h-4 w-12 bg-[rgb(var(--muted))] rounded"></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="h-4 w-20 bg-[rgb(var(--muted))] rounded"></li>
        </ol>
      </nav>

      {/* Header Skeleton */}
      <div className="max-w-2xl mb-12">
        <div className="h-10 w-64 bg-[rgb(var(--muted))] rounded mb-4"></div>
        <div className="h-6 w-full max-w-md bg-[rgb(var(--muted))] rounded"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl bg-[rgb(var(--muted))]"></div>
        ))}
      </div>
    </div>
  );
}
