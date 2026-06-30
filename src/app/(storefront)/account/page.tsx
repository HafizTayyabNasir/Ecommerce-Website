export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, User, Settings, LogOut } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-4 bg-[rgb(var(--secondary))] rounded-xl mb-6">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">{user.email}</p>
            {user.loyaltyPoints > 0 && (
              <div className="mt-3 pt-3 border-t border-[rgb(var(--border))]">
                <p className="text-xs font-bold text-[rgb(var(--accent))] uppercase tracking-wider">
                  SUSPENDED Rewards
                </p>
                <p className="text-xl font-bold">{user.loyaltyPoints} PTS</p>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-1">
            <Link 
              href="/account" 
              className="flex items-center gap-3 px-4 py-3 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-lg font-medium"
            >
              <User className="h-5 w-5" />
              Overview
            </Link>
            <Link 
              href="/account/orders" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-[rgb(var(--secondary))] rounded-lg font-medium transition-colors"
            >
              <Package className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
              Order History
            </Link>
            <Link 
              href="/account/settings" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-[rgb(var(--secondary))] rounded-lg font-medium transition-colors"
            >
              <Settings className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
              Account Settings
            </Link>
            <form action="/api/auth/signout" method="POST" className="mt-4 border-t border-[rgb(var(--border))] pt-4">
              <button 
                type="submit" 
                className="w-full flex items-center gap-3 px-4 py-3 text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive)/0.1)] rounded-lg font-medium transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </form>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back.</h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Manage your orders, addresses, and account details here.
            </p>
          </div>

          {/* Recent Orders section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-[rgb(var(--accent))] hover:underline font-medium">
                View All Orders
              </Link>
            </div>
            
            {user.orders.length === 0 ? (
              <div className="p-8 text-center bg-[rgb(var(--secondary))] rounded-xl border border-[rgb(var(--border))]">
                <Package className="h-12 w-12 mx-auto text-[rgb(var(--muted-foreground))] mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-[rgb(var(--muted-foreground))] mb-6">When you place an order, it will appear here.</p>
                <Button asChild><Link href="/products">Start Shopping</Link></Button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map(order => (
                  <div key={order.id} className="p-5 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold">{order.orderNumber}</span>
                        <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "CANCELLED" ? "destructive" : "default"} className="text-[10px]">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                      <span className="font-bold text-lg">{formatPrice(Number(order.totalAmount))}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Account Details Quick View */}
          <section className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[rgb(var(--secondary))] rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                Profile Details
                <Link href="/account/settings" className="text-xs text-[rgb(var(--accent))] font-normal hover:underline">Edit</Link>
              </h3>
              <div className="space-y-2 text-sm text-[rgb(var(--muted-foreground))]">
                <p><span className="text-[rgb(var(--foreground))] font-medium">Name:</span> {user.name}</p>
                <p><span className="text-[rgb(var(--foreground))] font-medium">Email:</span> {user.email}</p>
                <p><span className="text-[rgb(var(--foreground))] font-medium">Phone:</span> {user.phone || "Not provided"}</p>
              </div>
            </div>
            
            <div className="p-6 bg-[rgb(var(--secondary))] rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                Default Address
                <Link href="/account/settings" className="text-xs text-[rgb(var(--accent))] font-normal hover:underline">Manage</Link>
              </h3>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">
                <p>No default address set.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

