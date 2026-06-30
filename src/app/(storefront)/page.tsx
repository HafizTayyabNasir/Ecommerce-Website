export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroCarousel } from "@/components/storefront/hero-carousel";
// Demo data for the homepage
const featuredCollections = [
  {
    name: "Essential Tees",
    slug: "tees-tops",
    description: "Premium cotton, oversized fits",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    productCount: 12,
  },
  {
    name: "Hoodies & Sweats",
    slug: "hoodies-sweats",
    description: "Heavy fleece, street-ready",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    productCount: 8,
  },
  {
    name: "Joggers & Pants",
    slug: "joggers-pants",
    description: "Move without limits",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    productCount: 10,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    productCount: 15,
  },
];

const bestsellerProducts = [
  {
    name: "Phantom Oversized Tee",
    slug: "phantom-oversized-tee",
    price: 45,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    name: "Urban Cargo Jogger",
    slug: "urban-cargo-jogger",
    price: 89,
    compareAtPrice: 120,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    badge: "sale",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    name: "Stealth Hoodie",
    slug: "stealth-hoodie",
    price: 110,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1614031679233-a3d5f8a00ef9?w=800&q=80",
    badge: "new",
    rating: 4.7,
    reviewCount: 56,
  },
  {
    name: "Drift Training Shorts",
    slug: "drift-training-shorts",
    price: 55,
    compareAtPrice: 65,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    badge: "sale",
    rating: 4.6,
    reviewCount: 42,
  },
];

const testimonials = [
  {
    name: "Alex R.",
    text: "The quality of these hoodies is unreal. Thick, comfortable, and the fit is exactly what I was looking for. Already ordered two more.",
    rating: 5,
    product: "Stealth Hoodie",
  },
  {
    name: "Jordan M.",
    text: "Best joggers I've ever owned. The cargo pockets are functional, the material stretches perfectly, and they look fire with everything.",
    rating: 5,
    product: "Urban Cargo Jogger",
  },
  {
    name: "Sam K.",
    text: "Shipping was lightning fast and the packaging alone shows they care about the details. The oversized tee fits perfectly — not too long, not too boxy.",
    rating: 5,
    product: "Phantom Oversized Tee",
  },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", subtitle: "Orders over $100" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day guarantee" },
  { icon: Shield, title: "Secure Payments", subtitle: "256-bit encryption" },
  { icon: Zap, title: "Fast Dispatch", subtitle: "Ships within 24h" },
];

export default function HomePage() {
  return (
    <div className="page-transition">
      {/* ─── HERO SECTION (Carousel) ─────────────────────── */}
      <HeroCarousel />

      {/* ─── TRUST BADGES ──────────────────────────────────── */}
      <section className="border-b border-[rgb(var(--border))]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[rgb(var(--border))]">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 py-6 px-4 lg:px-6"
              >
                <badge.icon className="h-6 w-6 text-[rgb(var(--accent))] shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{badge.title}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS ──────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--accent))] mb-2">
                Curated For You
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/collections"
              className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-[rgb(var(--accent))] transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[rgb(var(--secondary))]"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                {/* Image */}
                <img src={collection.image} alt={collection.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 z-20">
                  <h3 className="text-white font-bold text-lg lg:text-xl mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white group-hover:text-[rgb(var(--accent))] transition-colors">
                    Shop Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[rgb(var(--secondary))]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--accent))] mb-2">
                Most Loved
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Bestsellers
              </h2>
            </div>
            <Link
              href="/collections/bestsellers"
              className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-[rgb(var(--accent))] transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestsellerProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="product-card group bg-[rgb(var(--background))] rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[rgb(var(--muted))]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {product.badge === "sale" && (
                      <span className="badge-sale">
                        {product.compareAtPrice
                          ? `-${Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%`
                          : "Sale"}
                      </span>
                    )}
                    {product.badge === "new" && (
                      <span className="badge-new">New</span>
                    )}
                    {product.badge === "bestseller" && (
                      <Badge variant="default" className="text-[10px]">
                        Bestseller
                      </Badge>
                    )}
                  </div>

                  {/* Quick Add overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full text-xs uppercase tracking-wider"
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-[rgb(var(--accent))] text-[rgb(var(--accent))]"
                              : "text-[rgb(var(--muted-foreground))]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[rgb(var(--muted-foreground))]">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-[rgb(var(--accent))] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      ${product.price}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-[rgb(var(--muted-foreground))] line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY STRIP ─────────────────────────────── */}
      <section className="py-20 lg:py-32 bg-[rgb(var(--foreground))] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="bg-grid w-full h-full" />
        </div>
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[rgb(var(--accent))] rounded-full opacity-5 blur-[150px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--accent))] mb-4">
              Our Philosophy
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
              Built for those who{" "}
              <span className="text-gradient">refuse to blend in</span>
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Every piece in our collection is designed at the intersection of 
              streetwear and performance. We obsess over fabric weight, stitch quality, 
              and the small details that make our clothes feel as good on day 100 as day 1.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link href="/pages/about">
                Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--accent))] mb-2">
              Real Talk
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Our Community Says
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-[rgb(var(--secondary))] rounded-xl p-6 lg:p-8 relative"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[rgb(var(--accent))] text-[rgb(var(--accent))]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[rgb(var(--foreground))] mb-4 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-[rgb(var(--muted-foreground))]">
                      on {testimonial.product}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(255,140,80)] rounded-2xl p-8 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
            <div className="relative max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                First Drop? Get 25% Off.
              </h2>
              <p className="text-white/80 mb-6">
                New to Zero Lifestyle? Use code <strong>STREET25</strong> at checkout 
                and save on your first order. No minimum, no catch.
              </p>
              <Button
                size="lg"
                className="bg-white text-[rgb(var(--foreground))] hover:bg-white/90"
                asChild
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

