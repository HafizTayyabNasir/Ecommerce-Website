export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Eye, Filter } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50, // Limit for demo
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[rgb(var(--background))] p-5 rounded-xl border border-[rgb(var(--border))]">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Manage and fulfill customer orders.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search by order number or email..."
            className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
          />
        </div>
        <select className="px-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
          <option value="">Fulfillment Status</option>
          <option value="UNFULFILLED">Unfulfilled</option>
          <option value="FULFILLED">Fulfilled</option>
        </select>
        <select className="px-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
          <option value="">Payment Status</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="REFUNDED">Refunded</option>
        </select>
        <Button variant="outline" className="shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Orders Table */}
      <div className="bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--secondary)/0.5)]">
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Order
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Fulfillment
                </th>
                <th className="text-right text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-[rgb(var(--muted-foreground))]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[rgb(var(--secondary)/0.3)] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <Link href={`/admin/orders/${order.id}`} className="font-bold text-sm hover:text-[rgb(var(--accent))] transition-colors">
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-[rgb(var(--muted-foreground))]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{order.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold">
                          {formatPrice(Number(order.totalAmount))}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={order.paymentStatus === "PAID" ? "success" : order.paymentStatus === "PENDING" ? "warning" : "default"}
                          className="text-[10px]"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={order.fulfillmentStatus === "DELIVERED" ? "success" : order.fulfillmentStatus === "UNFULFILLED" ? "secondary" : "default"}
                          className="text-[10px]"
                        >
                          {order.fulfillmentStatus}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[rgb(var(--border))] flex items-center justify-between text-sm text-[rgb(var(--muted-foreground))]">
          <span>Showing {orders.length} orders</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

