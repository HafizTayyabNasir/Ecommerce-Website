import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const revalidate = 3600;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
  });

  if (collection) {
    return {
      title: collection.metaTitle || collection.name,
      description: collection.metaDescription || collection.description,
    };
  }

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (category) {
    return {
      title: category.name,
      description: category.description,
    };
  }

  return { title: "Collection Not Found" };
}

async function getCollectionOrCategoryProducts(slug: string) {
  // First check if it's a Collection
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });

  if (collection) {
    // If it's a smart collection (e.g. Bestsellers or New Arrivals),
    // we use a specific query logic based on slug for simplicity in Phase 1
    if (collection.isSmartCollection) {
      if (slug === "new-arrivals") {
        return {
          title: collection.name,
          description: collection.description,
          products: await prisma.product.findMany({
            where: { status: "ACTIVE" },
            orderBy: { createdAt: "desc" },
            take: 24,
            include: { images: { where: { isPrimary: true }, take: 1 }, category: true },
          }),
        };
      }
      if (slug === "bestsellers") {
        return {
          title: collection.name,
          description: collection.description,
          products: await prisma.product.findMany({
            where: { status: "ACTIVE", isFeatured: true },
            take: 24,
            include: { images: { where: { isPrimary: true }, take: 1 }, category: true },
          }),
        };
      }
      if (slug === "sale") {
        return {
          title: collection.name,
          description: collection.description,
          products: await prisma.product.findMany({
            where: { status: "ACTIVE", compareAtPrice: { not: null } },
            take: 24,
            include: { images: { where: { isPrimary: true }, take: 1 }, category: true },
          }),
        };
      }
    }

    // Manual collection fallback
    const collectionProducts = await prisma.collectionProduct.findMany({
      where: { collectionId: collection.id },
      include: {
        product: {
          include: { images: { where: { isPrimary: true }, take: 1 }, category: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return {
      title: collection.name,
      description: collection.description,
      products: collectionProducts.map((cp) => cp.product),
    };
  }

  // If not a Collection, check if it's a Category
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (category) {
    const products = await prisma.product.findMany({
      where: { categoryId: category.id, status: "ACTIVE" },
      include: { images: { where: { isPrimary: true }, take: 1 }, category: true },
      orderBy: { createdAt: "desc" },
    });

    return {
      title: category.name,
      description: category.description,
      products,
    };
  }

  return null;
}

export default async function CollectionPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const data = await getCollectionOrCategoryProducts(params.slug);

  if (!data) {
    notFound();
  }

  const { title, description, products } = data;

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
          <li><ChevronRight className="h-4 w-4" /></li>
          <li>
            <Link href="/collections" className="hover:text-[rgb(var(--foreground))] transition-colors">
              Collections
            </Link>
          </li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-[rgb(var(--foreground))] font-medium">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-[rgb(var(--secondary))] rounded-xl">
          <h3 className="text-xl font-bold mb-2">Collection is empty</h3>
          <p className="text-[rgb(var(--muted-foreground))] mb-6">There are no products in this collection yet.</p>
          <Button asChild><Link href="/products">Shop All Products</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => {
            const discount = product.compareAtPrice 
              ? Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100) 
              : null;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="product-card group relative bg-[rgb(var(--background))] rounded-xl overflow-hidden"
              >
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

                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {discount && <span className="badge-sale">-{discount}%</span>}
                    {product.isFeatured && <Badge variant="default" className="text-[10px]">Featured</Badge>}
                  </div>
                </div>

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
  );
}
