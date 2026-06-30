import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Lookbook",
  description: "Latest news, styling tips, and lookbooks from Zero Lifestyle.",
};

const blogPosts = [
  {
    id: 1,
    title: "Summer '26 Lookbook: The New Streetwear Aesthetic",
    excerpt: "Dive into our latest collection designed for the heat. Featuring lightweight breathable fabrics, oversized drops, and muted color palettes.",
    author: "Creative Team",
    date: "June 28, 2026",
    category: "Lookbook",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
    slug: "summer-26-lookbook"
  },
  {
    id: 2,
    title: "How to Style Oversized Tees Without Looking Messy",
    excerpt: "The oversized tee is a streetwear staple, but there is a fine line between looking effortlessly cool and looking like you're wearing a tent. Here is how to master the proportions.",
    author: "Alex Rivera",
    date: "June 15, 2026",
    category: "Styling Guide",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
    slug: "how-to-style-oversized-tees"
  },
  {
    id: 3,
    title: "Behind the Seams: Developing the Stealth Hoodie",
    excerpt: "It took 14 prototypes, 3 different heavyweight cotton blends, and 6 months of wear-testing to perfect our best-selling Stealth Hoodie.",
    author: "Product Design",
    date: "May 30, 2026",
    category: "Behind the Scenes",
    image: "https://images.unsplash.com/photo-1614031679233-a3d5f8a00ef9?w=1200&q=80",
    slug: "behind-the-seams-stealth-hoodie"
  }
];

export default function BlogPage() {
  return (
    <div className="page-transition">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 uppercase">
            The Journal
          </h1>
          <p className="text-lg text-[rgb(var(--muted-foreground))]">
            Stories, style guides, and latest drops from the Zero Lifestyle team.
          </p>
        </div>

        {/* Featured Post (First one) */}
        <div className="mb-16 lg:mb-24">
          <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-2xl bg-[rgb(var(--muted))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))] mb-4">
                  <span className="uppercase tracking-wider font-semibold text-[rgb(var(--accent))]">{blogPosts[0].category}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blogPosts[0].date}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 group-hover:text-[rgb(var(--accent))] transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-[rgb(var(--muted-foreground))] text-lg mb-8 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider group-hover:text-[rgb(var(--accent))] transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[rgb(var(--muted))] mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-[rgb(var(--muted-foreground))] mb-3">
                <span className="uppercase tracking-wider font-semibold text-[rgb(var(--accent))]">{post.category}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-[rgb(var(--accent))] transition-colors">
                {post.title}
              </h3>
              <p className="text-[rgb(var(--muted-foreground))] mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider group-hover:text-[rgb(var(--accent))] transition-colors">
                Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
