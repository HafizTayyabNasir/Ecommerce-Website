"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageProps {
  id: string;
  url: string;
  alt: string | null;
}

export function ProductGallery({ images }: { images: ImageProps[] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[rgb(var(--muted))] rounded-xl flex items-center justify-center">
        <span className="text-[rgb(var(--muted-foreground))] uppercase text-xs tracking-widest">
          No Image Available
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails (Left side on desktop, bottom on mobile) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-24 shrink-0 pb-2 lg:pb-0 hide-scrollbar">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative aspect-[3/4] w-20 lg:w-full rounded-md overflow-hidden bg-[rgb(var(--muted))] transition-all",
              activeImage.id === img.id
                ? "ring-2 ring-[rgb(var(--foreground))] ring-offset-2 opacity-100"
                : "opacity-60 hover:opacity-100"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt || "Product thumbnail"}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:min-h-[600px] bg-[rgb(var(--muted))] rounded-xl overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.url}
          alt={activeImage.alt || "Product image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
