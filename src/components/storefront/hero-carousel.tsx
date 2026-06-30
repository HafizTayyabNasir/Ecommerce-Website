"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=80",
    subtitle: "Style accents",
    title: "ACCESSORIES",
    description: "Crafted to complement every wardrobe.",
    cta: "SHOP ACCESSORIES",
    href: "/collections/accessories",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80",
    subtitle: "New Drop — Summer '26",
    title: "STREETWEAR",
    description: "Premium silhouettes engineered for the culture.",
    cta: "SHOP NEW ARRIVALS",
    href: "/collections/new-arrivals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1600&q=80",
    subtitle: "Heavyweight Comfort",
    title: "ESSENTIALS",
    description: "Oversized fits and premium cotton basics.",
    cta: "SHOP TEES & TOPS",
    href: "/collections/tees-tops",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=1600&q=80",
    subtitle: "End of Season",
    title: "FINAL SALE",
    description: "Up to 50% off selected items. Limited time only.",
    cta: "SHOP SALE",
    href: "/collections/sale",
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          {/* Full-width Background Image */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={cn(
                "w-full h-full object-cover object-center opacity-80 transition-transform duration-[10000ms]",
                index === current ? "scale-105" : "scale-100"
              )}
            />
            {/* Subtle gradient overlay to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Content overlaid on the left */}
          <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-xl text-white">
              <p 
                className={cn(
                  "text-xl md:text-2xl font-light mb-2 tracking-wide transition-all duration-700 delay-100",
                  index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.subtitle}
              </p>
              <h1 
                className={cn(
                  "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 uppercase transition-all duration-700 delay-300",
                  index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl text-white/90 mb-10 font-light transition-all duration-700 delay-500",
                  index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.description}
              </p>
              
              <div 
                className={cn(
                  "transition-all duration-700 delay-700",
                  index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-white border-white bg-transparent hover:bg-white hover:text-black uppercase tracking-[0.2em] text-xs font-semibold rounded-none px-10 py-6"
                >
                  <Link href={slide.href}>
                    {slide.cta}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors border border-white/20 z-20 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronRight className="h-6 w-6 rotate-180" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors border border-white/20 z-20 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 transition-all duration-300 rounded-full",
              i === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
