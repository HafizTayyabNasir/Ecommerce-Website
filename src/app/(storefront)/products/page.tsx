import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, SlidersHorizontal, Star } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-dynamic";

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  const categoryParam = searchParams.category;
  const sortParam = searchParams.sort;

  let orderBy: any = { createdAt: "desc" };
  if (sortParam === "price-asc") orderBy = { price: "asc" };
  if (sortParam === "price-desc") orderBy = { price: "desc" };
  if (sortParam === "name-asc") orderBy = { name: "asc" };

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(categoryParam && typeof categoryParam === "string"
        ? { category: { slug: categoryParam } }
        : {}),
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      category: true,
      variants: true,
    },
    orderBy,
  });

  return products;
}

export default async function ProductsPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  const products = await getProducts(searchParams);
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
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
          <li className="text-[rgb(var(--foreground))] font-medium">All Products</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Shop All</h1>
          <p className="text-[rgb(var(--muted-foreground))]">
            {products.length} products available
          </p>
        </div>
        
        {/* Filters & Sort Mobile Toggle */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:w-auto md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">Sort by:</span>
            <select 
              className="h-10 border border-[rgb(var(--border))] rounded-md bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
              defaultValue="newest"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block space-y-8">
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className={`text-sm hover:text-[rgb(var(--accent))] transition-colors ${!searchParams.category ? 'font-semibold text-[rgb(var(--accent))]' : 'text-[rgb(var(--muted-foreground))]'}`}
                >
                  All Categories
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className={`text-sm hover:text-[rgb(var(--accent))] transition-colors ${searchParams.category === category.slug ? 'font-semibold text-[rgb(var(--accent))]' : 'text-[rgb(var(--muted-foreground))]'}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Price Range
            </h3>
            <div className="space-y-3">
              {['Under $50', '$50 - $100', '$100 - $150', 'Over $150'].map(range => (
                <label key={range} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-[rgb(var(--border))] group-hover:border-[rgb(var(--accent))] transition-colors" />
                  <span className="text-sm text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors">{range}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-[rgb(var(--secondary))] rounded-xl">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-[rgb(var(--muted-foreground))] mb-6">Try adjusting your filters to see more results.</p>
              <Button asChild><Link href="/products">Clear Filters</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product) => {
                // Calculate discount if applicable
                const discount = product.compareAtPrice 
                  ? Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100) 
                  : null;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="product-card group relative bg-[rgb(var(--background))] rounded-xl overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[rgb(var(--muted))]">
                      {product.images[0] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt || product.name}
                          className="product-image w-full h-full object-cover"
                        />
                      ) : (
                        <div className="product-image w-full h-full bg-gradient-to-br from-[rgb(var(--muted))] to-[rgb(var(--secondary))]" />
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                        {discount && (
                          <span className="badge-sale">-{discount}%</span>
                        )}
                        {product.isFeatured && (
                          <Badge variant="default" className="text-[10px]">
                            Featured
                          </Badge>
                        )}
                        {!product.quantity && product.trackInventory && (
                          <span className="badge-sold-out">Sold Out</span>
                        )}
                      </div>

                      {/* Quick Add overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full text-xs uppercase tracking-wider bg-white/90 text-black hover:bg-white backdrop-blur"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1 uppercase tracking-wider">
                        {product.category?.name || "Apparel"}
                      </p>
                      <h3 className="font-medium text-sm mb-2 group-hover:text-[rgb(var(--accent))] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {formatPrice(Number(product.price))}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-[rgb(var(--muted-foreground))] line-through">
                            {formatPrice(Number(product.compareAtPrice))}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
