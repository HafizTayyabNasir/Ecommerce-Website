import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/collections/new-arrivals" },
    { name: "Bestsellers", href: "/collections/bestsellers" },
    { name: "Tees & Tops", href: "/collections/tees-tops" },
    { name: "Hoodies & Sweats", href: "/collections/hoodies-sweats" },
    { name: "Joggers & Pants", href: "/collections/joggers-pants" },
    { name: "Accessories", href: "/collections/accessories" },
    { name: "Sale", href: "/collections/sale" },
  ],
  company: [
    { name: "About Us", href: "/pages/about" },
    { name: "Our Story", href: "/pages/our-story" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/pages/careers" },
    { name: "Store Locator", href: "/stores" },
    { name: "Contact", href: "/pages/contact" },
  ],
  support: [
    { name: "Help Center", href: "/pages/faq" },
    { name: "Shipping Info", href: "/pages/shipping" },
    { name: "Returns & Exchanges", href: "/pages/returns" },
    { name: "Size Guide", href: "/pages/size-guide" },
    { name: "Track Order", href: "/track-order" },
    { name: "Gift Cards", href: "/pages/gift-cards" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/pages/privacy" },
    { name: "Terms of Service", href: "/pages/terms" },
    { name: "Refund Policy", href: "/pages/refund-policy" },
    { name: "Cookie Policy", href: "/pages/cookies" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[rgb(var(--foreground))] text-[rgb(var(--background))]">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Join the Movement
              </h3>
              <p className="text-white/60 text-sm sm:text-base">
                Get 15% off your first order + exclusive early access to drops, sales, and street culture content.
              </p>
            </div>
            <div className="flex gap-2 max-w-md lg:ml-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 bg-white/10 border border-white/20 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition"
              />
              <Button
                variant="accent"
                size="lg"
                className="shrink-0 h-12 px-6"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[rgb(var(--accent))] rounded-sm flex items-center justify-center">
                <span className="text-white font-black text-lg font-['Space_Grotesk']">
                  S
                </span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight text-white">
                SUSPENDED
              </span>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              Premium streetwear designed for those who move differently. 
              Built for comfort, styled for the culture.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[rgb(var(--accent))] transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[rgb(var(--accent))] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[rgb(var(--accent))] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[rgb(var(--accent))] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info — visible on larger screens */}
          <div className="hidden lg:block col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Street Culture Ave,<br />Los Angeles, CA 90001</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@suspended.store</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SUSPENDED. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Payment Icons placeholder */}
            <div className="flex items-center gap-2">
              {["Visa", "MC", "Amex", "PayPal"].map((method) => (
                <div
                  key={method}
                  className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white/60"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
