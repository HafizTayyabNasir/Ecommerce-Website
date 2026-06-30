"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe (will use env var in real app)
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (!mounted || items.length === 0) return null;

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 7.99;
  const taxes = subtotal * 0.0825; // Dummy 8.25% tax rate
  const total = subtotal + shipping + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, this would create an Order in the DB via Server Action / API Route
      // and then redirect to Stripe Checkout if 'stripe' was selected,
      // or to a success page if 'cod' was selected.
      
      if (paymentMethod === "stripe") {
        // Simulate API call to create Stripe session
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("In a real app, you would be redirected to Stripe Checkout now.");
        useCartStore.getState().clearCart();
        router.push("/");
      } else {
        // Cash on Delivery
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Order placed successfully via Cash on Delivery!");
        useCartStore.getState().clearCart();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Checkout</h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Complete your order details below.
            </p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="mb-4"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="col-span-1"
                />
                <Input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="col-span-1"
                />
                <Input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="col-span-1"
                />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-[rgb(var(--border))] rounded-lg cursor-pointer hover:bg-[rgb(var(--secondary))] transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[rgb(var(--foreground))] border-[rgb(var(--border))] focus:ring-[rgb(var(--ring))]"
                  />
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span className="font-medium">Credit / Debit Card (Stripe)</span>
                    <Lock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                  </div>
                </label>
                <label className="flex items-center p-4 border border-[rgb(var(--border))] rounded-lg cursor-pointer hover:bg-[rgb(var(--secondary))] transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[rgb(var(--foreground))] border-[rgb(var(--border))] focus:ring-[rgb(var(--ring))]"
                  />
                  <div className="ml-3">
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>
            </section>

            <Button
              type="submit"
              size="xl"
              className="w-full text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
            </Button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:border-l lg:border-[rgb(var(--border))] lg:pl-12">
          <div className="bg-[rgb(var(--secondary))] lg:bg-transparent rounded-xl p-6 lg:p-0 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-[rgb(var(--muted))] rounded-md overflow-hidden shrink-0">
                    {item.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-xs rounded-full flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                    {item.variantName && (
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">{item.variantName}</p>
                    )}
                  </div>
                  <div className="font-medium text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm py-6 border-y border-[rgb(var(--border))] mb-6">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--muted-foreground))]">Taxes</span>
                <span className="font-medium">{formatPrice(taxes)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))] bg-[rgb(var(--muted))] p-3 rounded-md">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <p>Your payment information is securely processed. We do not store your credit card details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
