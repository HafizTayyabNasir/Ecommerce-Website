"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options: any; // { Size: "L", Color: "Black" }
}

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  variants: Variant[];
}

export function AddToCartForm({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Extract unique option types and values from variants
  // e.g., optionsMap = { Size: ["S", "M", "L"], Color: ["Black", "White"] }
  const optionsMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    product.variants.forEach((v) => {
      Object.entries(v.options || {}).forEach(([key, value]) => {
        if (!map[key]) map[key] = new Set();
        map[key].add(value as string);
      });
    });
    
    // Convert Sets to Arrays
    const result: Record<string, string[]> = {};
    Object.keys(map).forEach(key => {
      result[key] = Array.from(map[key]);
    });
    return result;
  }, [product.variants]);

  // Initial state for selections
  const initialSelections = useMemo(() => {
    const defaultSelections: Record<string, string> = {};
    Object.keys(optionsMap).forEach(key => {
      // Auto-select first available option
      defaultSelections[key] = optionsMap[key][0];
    });
    return defaultSelections;
  }, [optionsMap]);

  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);

  // Find the variant that matches current selections
  const currentVariant = useMemo(() => {
    if (product.variants.length === 0) return null;
    
    return product.variants.find(v => {
      return Object.entries(selections).every(([key, value]) => {
        return v.options && v.options[key] === value;
      });
    }) || null;
  }, [product.variants, selections]);

  // Update selection
  const handleSelect = (optionName: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [optionName]: value
    }));
    setQuantity(1); // Reset quantity on variant change
  };

  const handleAddToCart = () => {
    // If product has variants but none matched (shouldn't happen with good data)
    if (product.variants.length > 0 && !currentVariant) return;
    
    // If variant is out of stock
    if (currentVariant && currentVariant.quantity <= 0) return;

    setIsAdding(true);
    
    addItem({
      productId: product.id,
      variantId: currentVariant?.id,
      name: product.name,
      variantName: currentVariant?.name,
      price: currentVariant ? Number(currentVariant.price) : Number(product.price),
      image: product.image,
      quantity,
      maxQuantity: currentVariant?.quantity || 99,
    });

    // Simulate network delay for UX
    setTimeout(() => {
      setIsAdding(false);
      // Could open cart drawer here
      alert("Added to cart!"); // Simple fallback
    }, 500);
  };

  const isOutOfStock = currentVariant ? currentVariant.quantity <= 0 : false;
  const currentPrice = currentVariant ? Number(currentVariant.price) : Number(product.price);

  return (
    <div className="space-y-8">
      <div className="text-2xl font-bold">
        {formatPrice(currentPrice)}
      </div>

      {/* Options Selectors */}
      {Object.entries(optionsMap).map(([optionName, values]) => (
        <div key={optionName}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {optionName}
            </h3>
            {optionName.toLowerCase() === "size" && (
              <button className="text-xs text-[rgb(var(--muted-foreground))] underline underline-offset-4 hover:text-[rgb(var(--foreground))] transition-colors">
                Size Guide
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {values.map((val) => {
              const isSelected = selections[optionName] === val;
              
              // Color swatches (simple check)
              if (optionName.toLowerCase() === "color") {
                // VERY basic color mapping for demo purposes
                const bgColor = val.toLowerCase().includes("black") ? "#000" 
                  : val.toLowerCase().includes("white") ? "#fff"
                  : val.toLowerCase().includes("gray") || val.toLowerCase().includes("charcoal") ? "#4b5563"
                  : val.toLowerCase().includes("olive") ? "#4d7c0f"
                  : val.toLowerCase().includes("sand") || val.toLowerCase().includes("khaki") ? "#d4d4d8"
                  : val.toLowerCase().includes("navy") ? "#1e3a8a"
                  : val.toLowerCase().includes("cream") ? "#fef3c7"
                  : "#ccc"; // default
                  
                return (
                  <button
                    key={val}
                    onClick={() => handleSelect(optionName, val)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all",
                      isSelected 
                        ? "border-[rgb(var(--foreground))] scale-110" 
                        : "border-transparent hover:scale-105 hover:border-[rgb(var(--muted-foreground))]"
                    )}
                    style={{ backgroundColor: bgColor }}
                    title={val}
                    aria-label={`Select color ${val}`}
                  />
                );
              }
              
              // Standard text buttons
              return (
                <button
                  key={val}
                  onClick={() => handleSelect(optionName, val)}
                  className={cn(
                    "h-10 px-4 flex items-center justify-center border text-sm font-medium transition-all",
                    isSelected 
                      ? "border-[rgb(var(--foreground))] bg-[rgb(var(--foreground))] text-[rgb(var(--background))]" 
                      : "border-[rgb(var(--border))] bg-transparent hover:border-[rgb(var(--foreground))]"
                  )}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4 pt-4 border-t border-[rgb(var(--border))]">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-[rgb(var(--border))] rounded-md h-12 w-32">
            <button 
              className="flex-1 h-full text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] disabled:opacity-50"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isOutOfStock}
            >
              -
            </button>
            <span className="flex-1 text-center font-medium">
              {quantity}
            </span>
            <button 
              className="flex-1 h-full text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] disabled:opacity-50"
              onClick={() => setQuantity(Math.min(currentVariant?.quantity || 99, quantity + 1))}
              disabled={(currentVariant && quantity >= currentVariant.quantity) || isOutOfStock}
            >
              +
            </button>
          </div>
          
          <Button 
            className="flex-1 h-12 text-base font-bold tracking-wide"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
          >
            {isAdding ? "Adding..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
        
        {currentVariant && currentVariant.quantity > 0 && currentVariant.quantity <= 5 && (
          <p className="text-xs font-medium text-[rgb(var(--warning))] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--warning))] animate-pulse" />
            Low stock — only {currentVariant.quantity} left
          </p>
        )}
      </div>
    </div>
  );
}
