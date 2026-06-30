"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="h-64 rounded-xl skeleton" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-[rgb(var(--muted-foreground))] mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = getCartTotal();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">
        Your Cart ({getCartCount()} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-[rgb(var(--border))] text-sm font-semibold uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {items.map((item) => (
            <div 
              key={item.id} 
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 border-b border-[rgb(var(--border))]"
            >
              {/* Product Info */}
              <div className="col-span-1 sm:col-span-6 flex gap-4">
                <div className="w-24 h-32 shrink-0 bg-[rgb(var(--muted))] rounded-md overflow-hidden relative">
                  {item.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] text-xs">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <Link href={`/products/${item.productId}`} className="font-semibold text-base hover:text-[rgb(var(--accent))] transition-colors">
                    {item.name}
                  </Link>
                  {item.variantName && (
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                      {item.variantName}
                    </p>
                  )}
                  <p className="text-sm font-medium mt-2 sm:hidden">
                    {formatPrice(item.price)}
                  </p>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-[rgb(var(--destructive))] hover:text-red-700 mt-auto pt-4 transition-colors w-max"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-1 sm:col-span-3 flex items-center sm:justify-center mt-4 sm:mt-0">
                <div className="flex items-center border border-[rgb(var(--border))] rounded-md h-10 w-28">
                  <button 
                    className="flex-1 h-full text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-medium text-sm">
                    {item.quantity}
                  </span>
                  <button 
                    className="flex-1 h-full text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-1 sm:col-span-3 flex items-center sm:justify-end hidden sm:flex font-semibold">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[rgb(var(--secondary))] rounded-xl p-6 lg:p-8 sticky top-24">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 border-b border-[rgb(var(--border))] pb-6">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Taxes</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-bold">Estimated Total</span>
              <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>

            <Button className="w-full h-12 text-base font-bold" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure, encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
