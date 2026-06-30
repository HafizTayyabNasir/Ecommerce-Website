import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ChevronRight } from "lucide-react";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-[rgb(var(--muted-foreground))] mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[rgb(var(--foreground))] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-[rgb(var(--foreground))] font-medium">All Collections</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight mb-8">Collections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[rgb(var(--secondary))]"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

            {/* Placeholder image logic */}
            {collection.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--muted))] to-[rgb(var(--secondary))] group-hover:scale-105 transition-transform duration-700" />
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20">
              <h2 className="text-white font-bold text-2xl lg:text-3xl mb-2">
                {collection.name}
              </h2>
              {collection.description && (
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {collection.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-medium text-white group-hover:text-[rgb(var(--accent))] transition-colors">
                Explore Collection
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
