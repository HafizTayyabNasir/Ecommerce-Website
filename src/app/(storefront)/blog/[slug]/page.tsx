import React from "react";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  return (
    <div className="page-transition bg-[rgb(var(--background))] min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--accent))] transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Journal
        </Link>

        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-[rgb(var(--muted-foreground))] mb-6">
            <span className="uppercase tracking-wider font-semibold text-[rgb(var(--accent))]">Editorial</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
            The Journal: {params.slug.replace(/-/g, " ")}
          </h1>
        </div>

        <div className="aspect-video w-full rounded-2xl bg-[rgb(var(--muted))] mb-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
            <span className="text-neutral-500 font-medium">Image Placeholder</span>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-[rgb(var(--muted-foreground))] leading-relaxed mb-8">
            This is a placeholder for the blog article "{params.slug.replace(/-/g, " ")}". 
            In Phase 2, this will be connected to the CMS backend so the team can write, publish, and manage full articles with rich text formatting.
          </p>
          <p>
            For now, the routing is set up and the front-end layout is prepared. The team can start drafting content strategies for lookbooks, styling guides, and brand updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "summer-26-lookbook" },
    { slug: "how-to-style-oversized-tees" },
    { slug: "behind-the-seams-stealth-hoodie" },
  ];
}
